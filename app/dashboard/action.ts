// app/dashboard/creer-challenge/actions.ts
"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/lib/db";
import { challenge, participation, soumissions, user } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { date, success } from "better-auth";
import { stat } from "fs";
import {
    ChallengeWithCreator,
    ServeurChallengeData,
    LeaderboardUser
} from "@/types/serveur-challenge";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { get } from "http";
import cloudinary from "@/lib/cloudinary";
import { Updock } from "next/font/google";



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

        // console.log("📦 Données reçues:", challengeData);
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

export async function getChallengeById(id: string) {
    // console.log("🔍 [ACTION] getChallengeById CALLED with id =", id);

    try {
        const result = await db.query.challenge.findFirst({
            where: eq(challenge.id, id),
        });

        // console.log("🔍 [ACTION] Drizzle result =", result);

        return result;

    } catch (error) {
        console.error("❌ [ACTION] Erreur récupération challenge:", error);
        return null;
    }
}

// app/dashboard/action.ts

export async function getChallengeWithUserData(
    challengeId: string,
    userId: string
): Promise<ServeurChallengeData | null> {
    console.log("🔍 [ACTION] getChallengeWithUserData CALLED", { challengeId, userId });

    try {
        // 1. Récupérer le challenge AVEC le créateur
        const challengeData = await db
            .select({
                id: challenge.id,
                titre: challenge.titre,
                description: challenge.description,
                nombrePersonne: challenge.nombrePersonne,
                regles: challenge.regles,
                pourcentageVote: challenge.pourcentageVote,
                dateDebut: challenge.dateDebut,
                dateFin: challenge.dateFin,
                statut: challenge.statut,
                createdBy: challenge.createdBy,
                creator: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            })
            .from(challenge)
            .leftJoin(user, eq(challenge.createdBy, user.id))
            .where(eq(challenge.id, challengeId))
            .limit(1);

        if (!challengeData[0]) {
            console.log("❌ [ACTION] Challenge non trouvé");
            return null;
        }

        // 2. Récupérer la participation de l'utilisateur
        const userParticipation = await db
            .select({
                id: participation.id,
                progression: participation.progression,
                statut: participation.statut,
                joinedAt: participation.joinedAt,
                isActive: participation.isActive,
            })
            .from(participation)
            .where(
                and(
                    eq(participation.challengeId, challengeId),
                    eq(participation.userId, userId)
                )
            )
            .limit(1);

        // 3. Compter le nombre total de participants
        const participantsCount = await db
            .select({ count: sql<number>`count(*)` })
            .from(participation)
            .where(
                and(
                    eq(participation.challengeId, challengeId),
                    eq(participation.isActive, true)
                )
            );

        // 4. Récupérer le classement
        const leaderboard = await db
            .select({
                userId: user.id,
                name: user.name,
                email: user.email,
                progression: participation.progression,
                avatar: sql<string>`UPPER(SUBSTRING(${user.name} FROM 1 FOR 2))`,
                joinedAt: participation.joinedAt,
            })
            .from(participation)
            .innerJoin(user, eq(participation.userId, user.id))
            .where(
                and(
                    eq(participation.challengeId, challengeId),
                    eq(participation.isActive, true)
                )
            )
            .orderBy(desc(participation.progression));

        // 5. Calculer le rang de l'utilisateur
        const userRank = leaderboard.findIndex(p => p.userId === userId) + 1;

        // 6. Formater les données avec les interfaces
        const result: ServeurChallengeData = {
            challenge: challengeData[0] as ChallengeWithCreator,
            userParticipation: userParticipation[0] || {
                progression: 0,
                statut: "non_inscrit",
                joinedAt: new Date(),
                isActive: false,
            },
            totalParticipants: participantsCount[0]?.count || 0,
            userRank,
            leaderboard: leaderboard.map((user, index): LeaderboardUser => ({
                rank: index + 1,
                userId: user.userId,
                name: user.name || user.email?.split('@')[0] || "Utilisateur",
                points: user.progression * 10,
                avatar: user.avatar || "US",
                progression: user.progression,
                isYou: user.userId === userId,
            })),
        };

        return result;

    } catch (error) {
        console.error("❌ [ACTION] Erreur récupération données challenge:", error);
        return null;
    }
}


//création d'une soumission pour un challenge
// export async function soumettreElement(formData: FormData) {
//     try {
//         const session = await auth.api.getSession({ headers: await headers() });
//         if (!session?.user) throw new Error("Utilisateur non authentifié");

//         const participationId = formData.get("participationId") as string;
//         const challengeId = formData.get("id") as string;

//         const url = formData.get("url") as string | null;
//         const snippet = formData.get("snippet") as string | null;
//         const projet_url = formData.get("projet_url") as string | null;

//         const demo = formData.get("video") as File | null;
//         const capture = formData.get("capture_ecran") as File | null;

//         let demoUrl: string | null = null;
//         let captureUrl: string | null = null;

//         // console.log("📁 Fichiers reçus :", {
//         //     demo: demo?.name,
//         //     capture: capture?.name
//         // });

//         // Fonction utilitaire d’upload sur Cloudinary
//         const uploadToCloudinary = (file: File, options: any) => {
//             return new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     options,
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 );

//                 file.arrayBuffer().then(buffer => {
//                     uploadStream.end(Buffer.from(buffer));
//                 });
//             });
//         };

//         // Upload vidéo
//         if (demo && demo.size > 0) {
//             const result: any = await uploadToCloudinary(demo, {
//                 resource_type: "video",
//                 folder: "challenge_assets"
//             });
//             demoUrl = result.secure_url;
//         }

//         // Upload capture d'écran
//         if (capture && capture.size > 0) {
//             const result: any = await uploadToCloudinary(capture, {
//                 folder: "challenge_assets"
//             });
//             captureUrl = result.secure_url;
//         }

//         // Enregistrement DB
//         const [nouvelleSoumission] = await db.insert(soumissions).values({
//             id: crypto.randomUUID(),
//             participationId,
//             url,
//             snippet,
//             projet_url,
//             demo: demoUrl,
//             capture_ecran: captureUrl,
//             statut: "en_attente",
//             dateSoumission: new Date()
//         }).returning();

//         // console.log("📌 Soumission enregistrée :", nouvelleSoumission);

//         revalidatePath(`/dashboard/serveur-challenge/${challengeId}`);

//         return { success: true, soumission: nouvelleSoumission };

//     } catch (error) {
//         console.error("❌ Erreur soumission:", error);
//         return { success: false, message: "Erreur lors de la soumission" };
//     }
// }

// Dans action.ts - GARDEZ UNIQUEMENT soumettreSansFichiers
export async function soumettreSansFichiers(formData: FormData) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) throw new Error("Utilisateur non authentifié");

        const participationId = formData.get("participationId") as string;
        const challengeId = formData.get("id") as string;
        const url = formData.get("url") as string | null;
        const snippet = formData.get("snippet") as string | null;
        const projet_url = formData.get("projet_url") as string | null;

        const demoUrl = formData.get("demoUrl") as string | null;
        const captureUrl = formData.get("captureUrl") as string | null;

        // Validation
        if (!demoUrl && !captureUrl) {
            return { success: false, message: "Au moins un fichier (vidéo ou image) est requis" };
        }

        if (!participationId) {
            return { success: false, message: "ID de participation manquant" };
        }

        console.log("📝 Enregistrement soumission:", {
            participationId,
            demoUrl: demoUrl ? "✓" : "✗",
            captureUrl: captureUrl ? "✓" : "✗"
        });

        const [nouvelleSoumission] = await db.insert(soumissions).values({
            id: crypto.randomUUID(),
            participationId,
            url,
            snippet,
            projet_url,
            demo: demoUrl,
            capture_ecran: captureUrl,
            statut: "en_attente",
            dateSoumission: new Date()
        }).returning();

        revalidatePath(`/dashboard/serveur-challenge/${challengeId}`);

        return { success: true, soumission: nouvelleSoumission };

    } catch (error) {
        console.error("❌ Erreur soumission:", error);
        return { success: false, message: "Erreur lors de l'enregistrement" };
    }
}




//afficher les soumissions d'une participation
export async function getSoumissionParticipation(participationId: string) {
    try {
        const soumissionList = await db.select().from(soumissions).where(eq(soumissions.participationId, participationId)).orderBy(desc(soumissions.dateSoumission));
        return soumissionList;
    } catch (error) {
        console.error("❌ Erreur récupération soumission:", error);
        return [];
    }
}
