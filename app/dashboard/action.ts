// app/dashboard/creer-challenge/actions.ts
"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/lib/db";
import { challenge, user } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
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

