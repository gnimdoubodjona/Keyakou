"use client";
import React, { useState } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCamera, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading } = useAuthSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);

  // Initialiser les données du formulaire quand user est chargé
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: "", // Tu peux ajouter bio à ton user si nécessaire
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Ici tu feras l'appel API pour mettre à jour le profil
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      console.log("Données à sauvegarder:", formData);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white">Non connecté</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-sans">Mon Profil</h1>
        <p className="text-gray-400 font-sans">Gérez vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte Photo de profil */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4 font-sans">Photo de profil</h2>
            
            <div className="flex flex-col items-center">
              {/* Photo */}
              <div className="relative group mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50"></div>
                {user.image ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-700 group-hover:ring-blue-500 transition-all">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FontAwesomeIcon icon={faCamera} className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-gray-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Bouton changer photo */}
              <button className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-semibold transition-all font-sans">
                <FontAwesomeIcon icon={faCamera} className="w-4 h-4 mr-2" />
                Changer la photo
              </button>

              {/* Stats */}
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-sm text-gray-400 font-sans">Niveau</span>
                  <span className="text-lg font-bold text-blue-400 font-mono">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <span className="text-sm text-gray-400 font-sans">Rang</span>
                  <span className="text-lg font-bold text-purple-400 font-mono">#42</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-sm text-gray-400 font-sans">XP</span>
                  <span className="text-lg font-bold text-green-400 font-mono">2,340</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'édition */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-lg font-bold text-white mb-6 font-sans">Informations personnelles</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-blue-400" />
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-blue-400" />
                  Adresse email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-sans resize-none"
                  placeholder="Parlez-nous de vous..."
                />
                <p className="text-xs text-gray-500 mt-2 font-sans">Maximum 200 caractères</p>
              </div>

              {/* Bouton Sauvegarder */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {saving ? (
                    "Enregistrement..."
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} className="w-4 h-4 mr-2" />
                      Sauvegarder les modifications
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl transition-all duration-200 font-sans"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}