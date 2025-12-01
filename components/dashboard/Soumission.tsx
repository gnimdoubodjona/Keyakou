// components/dashboard/SoumissionModal.tsx - VERSION CORRIGÉE
"use client";

import { soumettreSansFichiers } from "@/app/dashboard/action";
import { useState } from "react";

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
      // 1. Obtenir la signature via API
      const signatureData = await getCloudinarySignature();
      
      // 2. Préparer FormData pour Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.api_key);
      formData.append("timestamp", signatureData.timestamp.toString());
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);
      
      if (type === "video") {
        formData.append("resource_type", "video");
      }

      // 3. Upload direct vers Cloudinary
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

      // Validation basique
      if ((!videoFile || videoFile.size === 0) && (!imageFile || imageFile.size === 0)) {
        alert("Veuillez sélectionner au moins un fichier (vidéo ou image)");
        return;
      }

      let demoUrl = "";
      let captureUrl = "";

      // Uploads séquentiels (plus simple à debugger)
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

      // Préparer les données pour la soumission
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
    <div>
      <button 
        onClick={() => setOpen(true)} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Faire une soumission
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nouvelle Soumission</h2>
              <button 
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={uploading}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="participationId" value={participationId} />
              <input type="hidden" name="id" value={challengeId} />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL GitHub</label>
                  <input 
                    name="url" 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Snippet de code</label>
                  <textarea 
                    name="snippet" 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Collez votre code ici..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL du projet</label>
                  <input 
                    name="projet_url" 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://votre-projet.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vidéo démo {uploading && "(Upload en cours...)"}
                  </label>
                  <input 
                    type="file" 
                    name="video" 
                    accept="video/*" 
                    className="w-full border rounded px-3 py-2"
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats supportés: MP4, WebM (max 100MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Capture d'écran {uploading && "(Upload en cours...)"}
                  </label>
                  <input 
                    type="file" 
                    name="capture_ecran" 
                    accept="image/*" 
                    className="w-full border rounded px-3 py-2"
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats supportés: JPG, PNG, WebP (max 10MB)
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {uploading ? "📤 Envoi en cours..." : "🚀 Soumettre"}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}