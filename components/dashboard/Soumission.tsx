// components/dashboard/SoumissionModal.tsx
"use client";

import { soumettreSansFichiers } from "@/app/dashboard/action";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpload,
  faCode,
  faLink,
  faImage,
  faVideo,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SoumissionModal({ participationId, challengeId }: any) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fonction pour obtenir la signature via API
  const getCloudinarySignature = async (folder: string = "challenge_assets") => {
    const response = await fetch(`/api/cloudinary/signature?folder=${folder}`);
    if (!response.ok) {
      throw new Error("Erreur récupération signature");
    }
    return response.json();
  };

  // Fonction pour upload direct vers Cloudinary
  const uploadToCloudinaryDirect = async (file: File, type: "image" | "video") => {
    try {
      const signatureData = await getCloudinarySignature();
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.api_key);
      formData.append("timestamp", signatureData.timestamp.toString());
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);
      
      if (type === "video") {
        formData.append("resource_type", "video");
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/${type === "video" ? "video" : "image"}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return result.secure_url;

    } catch (error) {
      console.error(`❌ Erreur upload ${type}:`, error);
      throw error;
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    
    try {
      const formData = new FormData(event.currentTarget);
      const videoFile = formData.get("video") as File;
      const imageFile = formData.get("capture_ecran") as File;

      if ((!videoFile || videoFile.size === 0) && (!imageFile || imageFile.size === 0)) {
        alert("Veuillez sélectionner au moins un fichier (vidéo ou image)");
        return;
      }

      let demoUrl = "";
      let captureUrl = "";

      if (videoFile && videoFile.size > 0) {
        console.log("📤 Upload vidéo...");
        demoUrl = await uploadToCloudinaryDirect(videoFile, "video");
        console.log("✅ Vidéo uploadée:", demoUrl);
      }

      if (imageFile && imageFile.size > 0) {
        console.log("📤 Upload image...");
        captureUrl = await uploadToCloudinaryDirect(imageFile, "image");
        console.log("✅ Image uploadée:", captureUrl);
      }

      const soumissionFormData = new FormData();
      soumissionFormData.append("participationId", participationId);
      soumissionFormData.append("id", challengeId);
      soumissionFormData.append("url", formData.get("url") as string);
      soumissionFormData.append("snippet", formData.get("snippet") as string);
      soumissionFormData.append("projet_url", formData.get("projet_url") as string);
      soumissionFormData.append("demoUrl", demoUrl);
      soumissionFormData.append("captureUrl", captureUrl);

      console.log("📤 Soumission données...");
      const result = await soumettreSansFichiers(soumissionFormData);

      if (result.success) {
        alert("✅ Soumission réussie !");
        setOpen(false);
      } else {
        alert(`❌ Erreur: ${result.message}`);
      }

    } catch (error: any) {
      console.error("❌ Erreur lors de la soumission:", error);
      alert(`Erreur: ${error.message || "Erreur lors de l'upload"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Bouton fixé en bas à droite */}
      <button 
        onClick={() => setOpen(true)} 
        className="fixed bottom-8 right-8 bg-white text-black px-6 py-4 rounded-2xl font-bold shadow-2xl hover:bg-gray-200 transition-all duration-200 flex items-center gap-3 border-2 border-black z-40"
      >
        <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
        Soumettre mon projet
      </button>

      {/* Modal */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !uploading && setOpen(false)}
        >
          <div 
            className="bg-black border-2 border-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faUpload} className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans">Nouvelle Soumission</h2>
                  <p className="text-gray-400 text-sm">Partagez votre travail avec la communauté</p>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                disabled={uploading}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="participationId" value={participationId} />
              <input type="hidden" name="id" value={challengeId} />

              <div className="space-y-4">
                {/* URL GitHub */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                    <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                    URL GitHub
                  </label>
                  <input 
                    name="url" 
                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                {/* Snippet de code */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                    <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                    Snippet de code
                  </label>
                  
                  {/* Container style macOS */}
                  <div className="bg-gray-900 border-2 border-gray-700 rounded-xl overflow-hidden">
                    {/* Header style macOS avec les 3 boutons */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-gray-400 text-xs font-mono">snippet.js</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          const textarea = e.currentTarget.closest('.bg-gray-900')?.querySelector('textarea');
                          if (textarea) {
                            navigator.clipboard.writeText((textarea as HTMLTextAreaElement).value);
                            // Optionnel: afficher une notification
                            alert('Code copié !');
                          }
                        }}
                        className="text-gray-400 hover:text-white text-xs font-mono transition-colors"
                      >
                        copier
                      </button>
                    </div>
                    
                    {/* Zone de texte style éditeur */}
                    <div className="relative">
                      {/* Numéros de ligne */}
                      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 border-r border-gray-700 py-3 text-right pr-3 select-none pointer-events-none">
                        <div className="text-gray-500 text-xs font-mono leading-6">
                          {[...Array(10)].map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Textarea */}
                      <textarea 
                        name="snippet" 
                        className="w-full bg-transparent pl-16 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none font-mono text-sm leading-6 resize-none"
                        rows={10}
                        placeholder="// Collez votre code ici...
function helloWorld() {
  console.log('Hello, World!');
}

helloWorld();"
                        style={{ minHeight: '240px' }}
                      ></textarea>
                    </div>
                    
                    {/* Footer avec info */}
                    <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between">
                      <span className="text-gray-500 text-xs font-mono">UTF-8</span>
                      <span className="text-gray-500 text-xs font-mono">JavaScript</span>
                    </div>
                  </div>
                </div>

                {/* URL du projet */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                    <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
                    URL du projet déployé
                  </label>
                  <input 
                    name="projet_url" 
                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                    placeholder="https://votre-projet.com"
                  />
                </div>

                {/* Grid pour vidéo et image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Vidéo démo */}
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                      <FontAwesomeIcon icon={faVideo} className="w-4 h-4" />
                      Vidéo démo
                      {uploading && <span className="text-yellow-500 text-xs">(Upload...)</span>}
                    </label>
                    <div className="relative">
                      <input 
                        type="file" 
                        name="video" 
                        accept="video/*" 
                        className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 file:cursor-pointer cursor-pointer disabled:opacity-50"
                        disabled={uploading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      MP4, WebM (max 100MB)
                    </p>
                  </div>

                  {/* Capture d'écran */}
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                      <FontAwesomeIcon icon={faImage} className="w-4 h-4" />
                      Capture d'écran
                      {uploading && <span className="text-yellow-500 text-xs">(Upload...)</span>}
                    </label>
                    <div className="relative">
                      <input 
                        type="file" 
                        name="capture_ecran" 
                        accept="image/*" 
                        className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 file:cursor-pointer cursor-pointer disabled:opacity-50"
                        disabled={uploading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, WebP (max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 mt-8">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
                      Soumettre
                    </>
                  )}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setOpen(false)}
                  disabled={uploading}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}