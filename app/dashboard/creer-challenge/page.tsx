import { create } from "domain";
import { createChallenge } from "../action";


export default function CreerChallengePage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Créer un Nouveau Challenge
                </h1>
                <p className="text-gray-400">
                    Remplissez les informations pour lancer un nouveau défi
                </p>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-6">
                {/* ⬇️ Utilise directement l'action serveur */}
                <form action={createChallenge} className="space-y-6">
                    {/* Tous tes champs de formulaire */}
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Titre du Challenge *
                        </label>
                        <input 
                            name="titre" 
                            type="text"
                            required
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Ex: Créer une app React en 5 jours"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Description *
                        </label>
                        <textarea 
                            name="description"
                            required
                            rows={4}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Décrivez l'objectif du challenge..."
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Sujet/Thématique *
                        </label>
                        <select 
                            name="sujet"
                            required
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="react">React</option>
                            <option value="laravel">Laravel</option>
                            <option value="nodejs">Node.js</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Nombre maximum de participants *
                        </label>
                        <input 
                            name="nombrePersonne" 
                            type="number"
                            min="1"
                            max="100"
                            required
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Ex: 50"
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Règles du challenge *
                        </label>
                        <textarea 
                            name="regles"
                            required
                            rows={3}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Listez les règles importantes..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Date de début *
                            </label>
                            <input 
                                name="dateDebut" 
                                type="datetime-local"
                                required
                                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Date de fin *
                            </label>
                            <input 
                                name="dateFin" 
                                type="datetime-local"
                                required
                                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Créer le Challenge
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}