"use client";
import { Challenge } from "@/types/challenge";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faXmark, 
  faCode, 
  faUsers, 
  faCalendarDays, 
  faBolt,
  faClipboardList,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

export default function ChallengeDetailModal({
  challenge,
  onClose,
}: {
  challenge: Challenge | null;
  onClose: () => void;
}) {
  if (!challenge) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-white rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-black" />
        </button>

        {/* Header avec icône */}
        <div className="flex items-start gap-3 mb-4 pr-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
            <FontAwesomeIcon icon={faCode} className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1 font-sans">
              {challenge.titre}
            </h2>
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
              challenge.statut === 'en_cours' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : challenge.statut === 'en_attente' 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}>
              {challenge.statut === 'en_cours' ? 'En cours' : 
               challenge.statut === 'en_attente' ? 'À venir' : 'Terminé'}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/90 font-sans text-sm leading-relaxed mb-4">
          {challenge.description}
        </p>

        {/* Grille d'informations compacte */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Participants */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-white" />
              <span className="text-gray-400 text-xs font-sans">Participants</span>
            </div>
            <p className="text-white text-lg font-bold font-sans">
              {challenge.nombrePersonne}
            </p>
          </div>

          {/* Pourcentage vote */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faBolt} className="w-4 h-4 text-white" />
              <span className="text-gray-400 text-xs font-sans">Vote créateur</span>
            </div>
            <p className="text-white text-lg font-bold font-sans">
              {challenge.pourcentageVote}%
            </p>
          </div>

          {/* Dates combinées */}
          <div className="col-span-2 bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-white" />
              <span className="text-gray-400 text-xs font-sans">Période</span>
            </div>
            <p className="text-white text-sm font-sans">
              Du {new Date(challenge.dateDebut).toLocaleDateString('fr-FR')} au {new Date(challenge.dateFin).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Règles */}
        {challenge.regles && (
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faClipboardList} className="w-4 h-4 text-white" />
              <h3 className="text-white font-bold font-sans text-sm">Règles</h3>
            </div>
            <p className="text-gray-300 font-sans text-xs leading-relaxed">
              {challenge.regles}
            </p>
          </div>
        )}

        {/* Footer avec boutons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold font-sans text-sm"
          >
            Fermer
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors font-semibold font-sans text-sm flex items-center gap-2"
          >
            Rejoindre
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}