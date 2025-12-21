import AllChallenges from "@/components/dashboard/AllChallenges";
import { Suspense } from "react";

export default function ListeToutChallengesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-sans">
          Liste des Challenges
        </h1>
        <p className="text-gray-400 font-sans">
          Découvrez et relevez les défis disponibles
        </p>
      </div>

      {/* Liste des challenges avec Suspense */}
      <Suspense fallback={<ChallengesLoading />}>
        <AllChallenges />
      </Suspense>
    </div>
  );
}

// Composant de chargement
function ChallengesLoading() {
  const challenges = [...Array(6)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((_, index) => (
        <div
          key={index}
          className="relative bg-black rounded-3xl p-6 border-2 border-white animate-pulse"
        >
          {/* Header avec icône code + titre */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="w-20 h-8 bg-gray-700 rounded-xl"></div>
            <div className="flex">
              <div className="w-9 h-9 bg-gray-700 rounded-full -mr-2"></div>
              <div className="w-9 h-9 bg-gray-700 rounded-full -mr-2"></div>
              <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}