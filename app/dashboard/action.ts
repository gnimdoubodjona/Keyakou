// app/dashboard/creer-challenge/actions.ts
"use server";
import db from "@/lib/db";
import { challenge } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export async function createChallenge(formData: FormData): Promise<void> {
    try {
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
        };

        console.log("📦 Données reçues:", challengeData);

        await db.insert(challenge).values(challengeData);

        console.log("✅ Challenge créé avec succès !");
        console.log("🎯 ID:", challengeData.id);
        console.log("📝 Titre:", challengeData.titre);
        console.log("👥 Participants max:", challengeData.nombrePersonne);
        console.log("📅 Début:", challengeData.dateDebut);
        console.log("🏁 Fin:", challengeData.dateFin);
        
    } catch (error) {
        console.error("❌ Erreur création challenge:", error);
    }
}