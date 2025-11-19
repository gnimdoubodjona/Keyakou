// app/dashboard/creer-challenge/actions.ts
"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/lib/db";
import { challenge, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

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
            sujet: formData.get("sujet") as string,
            dateDebut: new Date(formData.get("dateDebut") as string),
            dateFin: new Date(formData.get("dateFin") as string),
            statut: "en_attente",
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