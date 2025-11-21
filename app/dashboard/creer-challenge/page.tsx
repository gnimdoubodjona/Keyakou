"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createChallenge } from "../action";
import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";

// Composant pour le bouton avec état
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 bg-white text-black font-bold py-4 px-8 rounded-2xl hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20 font-sans text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Création en cours...
        </span>
      ) : (
        'Créer le Challenge 🚀'
      )}
    </button>
  );
}

export default function CreerChallengePage() {
  const [regles, setRegles] = useState<string[]>([""]);

  const ajouterRegle = () => {
    setRegles([...regles, ""]);
  };

  const supprimerRegle = (index: number) => {
    if (regles.length > 1) {
      setRegles(regles.filter((_, i) => i !== index));
    }
  };

  const modifierRegle = (index: number, value: string) => {
    const newRegles = [...regles];
    newRegles[index] = value;
    setRegles(newRegles);
  };

  // Wrapper pour afficher les toasts
  const handleFormAction = async (formData: FormData) => {
    const loadingToast = toast.loading('Création du challenge...');
    
    try {
      await createChallenge(formData);
      toast.dismiss(loadingToast);
      toast.success('Challenge créé avec succès ! 🎉');
      setRegles([""]);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Erreur lors de la création');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 font-sans">
          Créer un Nouveau Challenge
        </h1>
        <p className="text-white font-sans">
          Remplissez les informations pour lancer un nouveau défi
        </p>
      </div>

      <div className="bg-black rounded-3xl p-8 border-2  shadow-2xl shadow-white/10">
        <form action={handleFormAction} className="space-y-8">
          {/* Titre */}
          <div>
            <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide font-sans">
              Titre du Challenge *
            </label>
            <input
              name="titre"
              type="text"
              required
              className="w-full bg-white border-2 border-black rounded-2xl px-5 py-4 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all font-sans text-lg font-medium"
              placeholder="Ex: Créer une app React en 5 jours"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide font-sans">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={5}
              className="w-full bg-white border-2 border-black rounded-2xl px-5 py-4 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all resize-none font-sans"
              placeholder="Décrivez l'objectif du challenge..."
            />
          </div>

          {/* Nombre de participants */}
          <div>
            <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide font-sans">
              Nombre maximum de participants *
            </label>
            <input
              name="nombrePersonne"
              type="number"
              min="1"
              max="100"
              required
              className="w-full bg-white border-2 border-black rounded-2xl px-5 py-4 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all font-mono text-lg font-bold"
              placeholder="Ex: 50"
            />
          </div>

          {/* Règles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-white font-bold text-sm uppercase tracking-wide font-sans">
                Règles du challenge *
              </label>
              <button
                type="button"
                onClick={ajouterRegle}
                className="px-4 py-2 bg-white text-black rounded-xl transition-all flex items-center gap-2 text-sm font-semibold font-sans"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                Ajouter une règle
              </button>
            </div>

            <div className="space-y-3">
              {regles.map((regle, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold font-mono mt-1">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={regle}
                    onChange={(e) => modifierRegle(index, e.target.value)}
                    required
                    className="flex-1 bg-white border-2 border-black rounded-2xl px-5 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all font-sans"
                    placeholder={`Règle ${index + 1}`}
                  />
                  {regles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => supprimerRegle(index)}
                      className="flex-shrink-0 w-10 h-10 bg-white border-2 border-black rounded-xl hover:bg-red-50 hover:border-red-500 transition-all flex items-center justify-center group-hover:opacity-100 opacity-60"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-black group-hover:text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="hidden"
              name="regles"
              value={regles.filter(r => r.trim()).join(" | ")}
            />

            <p className="text-xs text-gray-400 mt-3 font-sans">
              💡 Ajoutez autant de règles que nécessaire pour encadrer le challenge
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide font-sans">
                Date de début *
              </label>
              <input
                name="dateDebut"
                type="datetime-local"
                required
                className="w-full bg-white border-2 border-black rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-black/10 transition-all font-mono"
                style={{ colorScheme: 'light' }}
              />
            </div>
            <div>
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide font-sans">
                Date de fin *
              </label>
              <input
                name="dateFin"
                type="datetime-local"
                required
                className="w-full bg-white border-2 border-black rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-black/10 transition-all font-mono"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              className="px-8 py-4 bg-black border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all font-sans"
            >
              Annuler
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}