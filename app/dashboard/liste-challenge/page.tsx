"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUser, faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function ListeChallengePage() {
  const [modalOpen, setModalOpen] = useState<number | null>(null);

  // Données d'exemple
  const challenges = [
    {
      id: 1,
      titre: "Créer une Todo App React",
      description: "Commencer une petite description du challenge et ensuite terminer la fin avec des ...",
      dateFin: "2025-01-15",
      participants: 24,
      maxParticipants: 50,
    },
    {
      id: 2,
      titre: "API RESTful avec Node.js",
      description: "Créer une API complète avec authentification JWT et base de données MongoDB pour gérer...",
      dateFin: "2025-01-25",
      participants: 18,
      maxParticipants: 30,
    },
    {
      id: 3,
      titre: "Landing Page avec Tailwind",
      description: "Designer et développer une landing page moderne et responsive avec Tailwind CSS et animations...",
      dateFin: "2025-01-20",
      participants: 32,
      maxParticipants: 40,
    },
  ];

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

      {/* Grid des challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const participantsRestants = challenge.maxParticipants - challenge.participants;
          
          return (
            <div
              key={challenge.id}
              className="relative bg-black rounded-3xl p-6 border-2 border-white hover:shadow-2xl transition-all duration-300 text-3xl"
            >
              {/* Header avec icône code + titre */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faCode} className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-lg font-bold  text-white font-sans flex-1">
                  {challenge.titre}
                </h2>
                
                {/* Bouton menu 3 points */}
                <button 
                  onClick={() => setModalOpen(modalOpen === challenge.id ? null : challenge.id)}
                  className="relative w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5 text-black" />
                  
                  {/* Mini modal dropdown */}
                  {modalOpen === challenge.id && (
                    <div className="absolute top-10 right-0 w-48 bg-white border-2 border-black rounded-xl shadow-xl z-50 overflow-hidden">
                      <button className="w-full px-4 py-3 text-left text-sm font-semibold text-black hover:bg-gray-100 transition-colors">
                        Voir détails
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm font-semibold text-black hover:bg-gray-100 transition-colors">
                        Partager
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                        Signaler
                      </button>
                    </div>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-white mb-6 font-sans line-clamp-3">
                {challenge.description}
              </p>

              {/* Footer avec photos de profil + bouton */}
              <div className="flex items-center justify-between">
                {/* Bouton Rejoindre */}
                <button className="px-6 py-2 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 font-sans text-sm underline">
                  Rejoindre
                </button>

                {/* Cercles de profil empilés */}
                <div className="flex items-center">
                  {/* Premier cercle */}
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white -mr-2 z-30">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Deuxième cercle */}
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center border-2 border-white -mr-2 z-20">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Troisième cercle avec le "+X" */}
                  <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white z-10">
                    <span className="text-xs font-bold text-white">+{participantsRestants}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}