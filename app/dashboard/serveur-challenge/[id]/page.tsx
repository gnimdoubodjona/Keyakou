import { auth } from "@/lib/auth";
import { getChallengeWithUserData } from "../../action";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ServeurChallengeData } from "@/types/serveur-challenge";
import SoumissionModal from "@/components/dashboard/Soumission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faTrophy,
  faUsers,
  faChartLine,
  faCalendarDays,
  faPercent,
  faCrown,
  faMedal,
  faArrowUp,
  faArrowDown,
  faFileAlt,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import RadarChartClient from "@/components/dashboard/RadarChartClient";

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
      <div className="max-w-7xl mx-auto">

        {/* HEADER AVEC INFOS PERSONNELLES */}
        <div className="bg-white rounded-3xl p-8 mb-6 border-2 border-white">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                <FontAwesomeIcon icon={faCode} className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-sans text-black">{challenge.titre}</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Créé par {challenge.creator?.name || "Admin"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <FontAwesomeIcon icon={faTrophy} className="w-6 h-6 text-yellow-500" />
                <div className="text-4xl font-bold text-black">#{userRank}</div>
              </div>
              <div className="text-sm text-gray-600">Votre rang</div>
            </div>
          </div>

          {/* BARRE DE PROGRESSION PERSONNELLE */}
          <div>
            <div className="flex justify-between text-sm mb-2 text-black font-sans">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                Votre progression
              </span>
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
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-green-500" />
              <span className="text-3xl font-bold">{userParticipation.progression}%</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Progression</p>
          </div>

          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-blue-500" />
              <span className="text-3xl font-bold">{totalParticipants}/{challenge.nombrePersonne}</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Participants</p>
          </div>

          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faTrophy} className="w-6 h-6 text-yellow-500" />
              <span className="text-3xl font-bold">{userRank}</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Votre rang</p>
          </div>
        </div>

        {/* LAYOUT PRINCIPAL - 2 COLONNES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* COLONNE GAUCHE - Infos + Classement */}
          <div className="space-y-6">
            {/* DESCRIPTION */}
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5 text-white" />
                <h3 className="text-xl font-bold font-sans">Description</h3>
              </div>
              <p className="text-gray-300 font-sans leading-relaxed text-sm">
                {challenge.description}
              </p>
            </div>

            {/* RÈGLES */}
            {challenge.regles && (
              <div className="bg-black border-2 border-white rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon icon={faClipboardList} className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-bold font-sans">Règles</h3>
                </div>
                <p className="text-gray-300 font-sans leading-relaxed text-sm">
                  {challenge.regles}
                </p>
              </div>
            )}

            {/* INFORMATIONS SUPPLÉMENTAIRES */}
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 font-sans">Informations du challenge</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-400 text-sm">Date de début</span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {new Date(challenge.dateDebut).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-red-500" />
                    <span className="text-gray-400 text-sm">Date de fin</span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {new Date(challenge.dateFin).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPercent} className="w-4 h-4 text-green-500" />
                    <span className="text-gray-400 text-sm">Poids du vote</span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {challenge.pourcentageVote}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE - Classement + Radar */}
          <div className="space-y-6">
            {/* CLASSEMENT */}
            {leaderboard.length > 0 && (
              <div className="bg-black border-2 border-white rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FontAwesomeIcon icon={faCrown} className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold font-sans">Classement</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        user.isYou 
                          ? "bg-white border-2 border-yellow-400" 
                          : "bg-gray-900/50 hover:bg-gray-900 border border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rang avec médaille */}
                        <div className="w-8 text-center">
                          {user.rank <= 3 ? (
                            <div className="relative">
                              <FontAwesomeIcon
                                icon={faMedal}
                                className={`w-6 h-6 ${
                                  user.rank === 1
                                    ? "text-yellow-400"
                                    : user.rank === 2
                                    ? "text-gray-400"
                                    : "text-orange-600"
                                }`}
                              />
                              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-black">
                                {user.rank}
                              </span>
                            </div>
                          ) : (
                            <span className={`font-bold text-lg ${user.isYou ? "text-black" : "text-gray-500"}`}>
                              {user.rank}
                            </span>
                          )}
                        </div>

                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 ${
                          user.isYou 
                            ? "bg-black text-white border-yellow-400" 
                            : "bg-white text-black border-gray-300"
                        }`}>
                          {user.avatar}
                        </div>

                        {/* Nom */}
                        <div>
                          <p className={`font-semibold ${user.isYou ? "text-black" : "text-white"}`}>
                            {user.name}
                          </p>
                          <p className={`text-sm ${user.isYou ? "text-gray-700" : "text-gray-400"}`}>
                            {user.progression}% complété
                          </p>
                        </div>
                      </div>

                      {/* Points */}
                      <div className={`font-bold ${user.isYou ? "text-black" : "text-white"}`}>
                        {user.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RADAR CHART - Analyse de progression */}
            <RadarChartClient />
          </div>
        </div>

      </div>

      <SoumissionModal
        participationId={userParticipation.id}
        challengeId={challenge.id}
      />
    </div>
  );
}