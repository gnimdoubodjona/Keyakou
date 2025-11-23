// app/dashboard/challenges/components/ChallengesList.tsx
"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUser, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getChallenges } from "@/app/dashboard/action";
import ChallengeDetailModal from "./ChallengeDetailModal";


interface Challenge {
    id: string;
    titre: string;
    description: string;
    nombrePersonne: number;
    regles: string;
    pourcentageVote: number;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
    createdBy: string;
    creator?: {
        name: string | null;
        image: string | null;
    };
}



export default function ChallengesList() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null); // ← AJOUTÉ


    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getChallenges();
                setChallenges(data);
            } catch (error) {
                console.error("Erreur chargement challenges:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="relative bg-black rounded-3xl p-6 border-2 border-white animate-pulse"
                    >
                        {/* Skeleton loading */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-xl flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded"></div>
                        </div>
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

    if (challenges.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-white text-xl font-sans mb-4">
                    🎯 Aucun challenge pour le moment
                </div>
                <p className="text-gray-400 font-sans">
                    Soyez le premier à créer un challenge passionnant !
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
                // Pour l'instant, on simule des participants
                const participantsActuels = Math.floor(Math.random() * challenge.nombrePersonne);
                const participantsRestants = challenge.nombrePersonne - participantsActuels;

                return (
                    <div
                        key={challenge.id}
                        className="relative bg-black rounded-3xl p-6 border-2 border-white hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Header avec icône code + titre */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                                <FontAwesomeIcon icon={faCode} className="w-6 h-6 text-black" />
                            </div>
                            <h2 className="text-lg font-bold text-white font-sans flex-1 line-clamp-2">
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

                        {/* Info supplémentaire */}
                        {/* <div className="text-xs text-gray-400 mb-4 font-sans">
              <div>📅 Jusqu'au {new Date(challenge.dateFin).toLocaleDateString('fr-FR')}</div>
              <div>👥 {participantsActuels}/{challenge.nombrePersonne} participants</div>
              <div>⚡ {challenge.pourcentageVote}% vote créateur</div>
            </div> */}

                        {/* Footer avec photos de profil + bouton */}
                        <div className="flex items-center justify-between">
                            {/* Bouton Rejoindre */}
                            <button onClick={() => setSelectedChallenge(challenge)} className="px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 font-sans text-sm underline">
                                {/* {challenge.statut === 'en_cours' ? 'Rejoindre' : 
                 challenge.statut === 'en_attente' ? 'S\'inscrire' : 'Voir résultats'} */}
                                Voir plus...
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
                                {participantsRestants > 0 && (
                                    <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white z-10">
                                        <span className="text-xs font-bold text-white">+{participantsRestants}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Badge de statut */}
                        <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${challenge.statut === 'en_cours' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            challenge.statut === 'en_attente' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                            {challenge.statut === 'en_cours' ? 'En cours' :
                                challenge.statut === 'en_attente' ? 'À venir' : 'Terminé'}
                        </div>
                    </div>
                );
            })}

            {selectedChallenge && (
                <ChallengeDetailModal
                    challenge={selectedChallenge}
                    onClose={() => setSelectedChallenge(null)}
                />
            )}
        </div>
    );
}

