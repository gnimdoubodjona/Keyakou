"use client";
import { Challenge } from "@/types/challenge";
import React from "react";

export default function ChallengeModal({
  challenge,
  onClose,
}: {
  challenge: Challenge | null;
  onClose: () => void;
}) {
  if (!challenge) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
      onClick={onClose} // fermer si on clique dehors
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} // empêcher la fermeture si on clique dans la box
      >
        {/* Bouton X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          ✕
        </button>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-black mb-4">
          {challenge.titre}
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">{challenge.description}</p>

        {/* Infos */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>👥 Participants max:</strong> {challenge.nombrePersonne}
          </p>
          <p>
            <strong>⚡ Pourcentage créateur:</strong>{" "}
            {challenge.pourcentageVote}%
          </p>
          <p>
            <strong>📅 Début:</strong>{" "}
            {new Date(challenge.dateDebut).toLocaleString()}
          </p>
          <p>
            <strong>📅 Fin:</strong>{" "}
            {new Date(challenge.dateFin).toLocaleString()}
          </p>
          <p>
            <strong>📘 Règles:</strong>{" "}
            {challenge.regles ?? "Aucune règle fournie"}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
