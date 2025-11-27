// app/dashboard/creer-challenge/actions.ts
"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/lib/db";
import { challenge, participation, user } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { date } from "better-auth";
import { stat } from "fs";

export async function createChallenge(formData: FormData): Promise<void> {
    try {
        // ✅ Correct way to get session in Server Action
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        // Récupérer les infos du user en DB
        const currentUser = await db.query.user.findFirst({
            where: eq(user.id, session.user.id),
        });

        if (!currentUser) {
            throw new Error("Utilisateur non trouvé en base de données");
        }

        // Vérifier le rôle
        if (currentUser.role !== "super_admin") {
            throw new Error("🛑 Vous n'avez pas la permission de créer un challenge.");
        }

        const challengeData = {
            id: nanoid(),
            titre: formData.get("titre") as string,
            nombrePersonne: parseInt(formData.get("nombrePersonne") as string, 10),
            description: formData.get("description") as string,
            regles: formData.get("regles") as string,
            // sujet: formData.get("sujet") as string,
            dateDebut: new Date(formData.get("dateDebut") as string),
            dateFin: new Date(formData.get("dateFin") as string),
            statut: "en_cours",
            pourcentageVote: 100,
            createdBy: currentUser.id,
        };

        console.log("📦 Données reçues:", challengeData);
        await db.insert(challenge).values(challengeData);
        console.log("✅ Challenge créé avec succès !");

    } catch (error) {
        console.error("❌ Erreur création challenge:", error);
        throw error; // Important pour que le client voit l'erreur
    }
}

export async function getChallenges() {
    try {
        const challenges = await db.select({
            id: challenge.id,
            titre: challenge.titre,
            description: challenge.description,
            dateFin: challenge.dateFin,
            nombrePersonne: challenge.nombrePersonne,

            dateDebut: challenge.dateDebut,
            statut: challenge.statut,
            regles: challenge.regles,
            pourcentageVote: challenge.pourcentageVote,
            createdBy: challenge.createdBy,
            creator: {
                name: user.name,
                image: user.image,
            }
        })
            .from(challenge)
            .leftJoin(user, eq(challenge.createdBy, user.id));
        //.orderBy(desc(challenge.dateDebut));
        return challenges;
    } catch (error) {
        console.error("❌ Erreur récupération challenges:", error);
        return [];
    }
}







export async function rejoindreChallenge(challengeId: string): Promise<{ success: boolean; message: string }> {
  try {
    // Récupérer la session
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      throw new Error("Utilisateur non authentifié");
    }

    // Vérifier si le challenge existe
    const challengeExists = await db.query.challenge.findFirst({
      where: eq(challenge.id, challengeId),
    });

    if (!challengeExists) {
      throw new Error("Challenge non trouvé");
    }

    // Vérifier si l'utilisateur a déjà rejoint ce challenge
    const existingJoin = await db
      .select()
      .from(participation)
      .where(
        and(
          eq(participation.challengeId, challengeId),
          eq(participation.userId, session.user.id)
        )
      )
      .limit(1);

    if (existingJoin.length > 0) {
      // Mettre à jour si déjà existant
      await db
        .update(participation)
        .set({ 
          isActive: true, 
          joinedAt: new Date(),
          statut: "en_cours"
        })
        .where(
          and(
            eq(participation.challengeId, challengeId),
            eq(participation.userId, session.user.id)
          )
        );
      
      return { 
        success: true, 
        message: "Vous avez rejoint le challenge à nouveau !" 
      };
    } else {
      // Nouvelle participation
      await db.insert(participation).values({
        id: nanoid(),
        challengeId: challengeId,
        userId: session.user.id,
        progression: 0,
        statut: "en_cours",
        joinedAt: new Date(),
        isActive: true,
      });

      return { 
        success: true, 
        message: "Challenge rejoint avec succès !" 
      };
    }

  } catch (error: any) {
    console.error("❌ Erreur rejoindre challenge:", error);
    return {
      success: false,
      message: error.message || "Erreur lors de la participation"
    };
  }
}

// Server Action pour récupérer les challenges de l'utilisateur
export async function getUserChallenges() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return [];
    }

    // Récupérer les challenges de l'utilisateur
    const userChallenges = await db
      .select({
        id: challenge.id,
        title: challenge.titre,
        description: challenge.description,
        joinedAt: participation.joinedAt,
        isActive: participation.isActive,
        statut: challenge.statut,
        progression: participation.progression,
      })
      .from(participation)
      .innerJoin(challenge, eq(participation.challengeId, challenge.id))
      .where(
        and(
          eq(participation.userId, session.user.id),
          eq(participation.isActive, true)
        )
      )
      .orderBy(participation.joinedAt);

    return userChallenges.map(uc => ({
      id: uc.id,
      title: uc.title,
      slug: uc.id,
      joinedAt: uc.joinedAt.toISOString(),
      isActive: uc.isActive && uc.statut === "en_cours",
      progression: uc.progression,
    }));

  } catch (error) {
    console.error("❌ Erreur récupération challenges utilisateur:", error);
    return [];
  }
}
