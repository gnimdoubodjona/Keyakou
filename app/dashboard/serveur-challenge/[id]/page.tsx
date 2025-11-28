import { auth } from "@/lib/auth";
import { getChallengeWithUserData } from "../../action";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ServeurChallengeData } from "@/types/serveur-challenge";

export default async function ServeurChallengePage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  
  // 1. Récupérer l'ID du challenge
  const { id: challengeId } = await params;

  if (!challengeId) {
    return (
      <div className="p-6 text-red-500">
        ID du challenge non fourni.
      </div>
    );
  }

  // 2. Récupérer la session utilisateur
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  // 3. Récupérer TOUTES les données (challenge + participation)
  const data: ServeurChallengeData | null = await getChallengeWithUserData(
    challengeId, 
    session.user.id
  );

  console.log("📌 [PAGE] Données reçues =", data);

  if (!data) {
    return (
      <div className="p-6 text-red-500">
        Challenge introuvable. (ID: {challengeId})
      </div>
    );
  }

  // 4. Vérifier si l'utilisateur participe au challenge
  if (!data.userParticipation.isActive) {
    redirect("/dashboard/liste-challenge");
  }

  // 5. Déstructurer les données UNE SEULE FOIS
  const { challenge, userParticipation, totalParticipants, userRank, leaderboard } = data;

  // 6. Afficher les données
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER AVEC INFOS PERSONNELLES */}
        <div className="bg-white rounded-3xl p-8 mb-6 border-2 border-white">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold font-sans text-black">{challenge.titre}</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Créé par {challenge.creator?.name || "Admin"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-black">#{userRank}</div>
              <div className="text-sm text-gray-600">Votre rang</div>
            </div>
          </div>

          {/* BARRE DE PROGRESSION PERSONNELLE */}
          <div>
            <div className="flex justify-between text-sm mb-2 text-black font-sans">
              <span>Votre progression</span>
              <span className="font-bold">{userParticipation.progression}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${userParticipation.progression}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* STATS PERSONNELLES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="text-3xl font-bold text-center">{userParticipation.progression}%</div>
            <p className="text-gray-400 text-sm text-center font-sans">Progression</p>
          </div>

          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="text-3xl font-bold text-center">{totalParticipants}/{challenge.nombrePersonne}</div>
            <p className="text-gray-400 text-sm text-center font-sans">Participants</p>
          </div>

          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="text-3xl font-bold text-center">{userRank}</div>
            <p className="text-gray-400 text-sm text-center font-sans">Votre rang</p>
          </div>
        </div>

        {/* INFORMATIONS GÉNÉRALES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-black border-2 border-white rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 font-sans">Description</h3>
            <p className="text-gray-300 font-sans leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {challenge.regles && (
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 font-sans">Règles</h3>
              <p className="text-gray-300 font-sans leading-relaxed">
                {challenge.regles}
              </p>
            </div>
          )}
        </div>

        {/* INFORMATIONS SUPPLÉMENTAIRES */}
        <div className="bg-black border-2 border-white rounded-3xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 font-sans">Informations du challenge</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Date de début:</span>
              <span className="text-white">{new Date(challenge.dateDebut).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date de fin:</span>
              <span className="text-white">{new Date(challenge.dateFin).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Statut:</span>
              <span className="text-white">{challenge.statut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Poids du vote:</span>
              <span className="text-white">{challenge.pourcentageVote}%</span>
            </div>
          </div>
        </div>

        {/* CLASSEMENT (optionnel - vous pouvez l'ajouter plus tard) */}
        {leaderboard.length > 0 && (
          <div className="bg-black border-2 border-white rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 font-sans">Classement</h3>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    user.isYou ? "bg-white text-black" : "bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center font-bold">#{user.rank}</div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      user.isYou ? "bg-black text-white" : "bg-white text-black"
                    }`}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm opacity-70">{user.progression}%</p>
                    </div>
                  </div>
                  <div className="font-bold">{user.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}