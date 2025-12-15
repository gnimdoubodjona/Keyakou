"use client";
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      // 1. Afficher un loader
      Swal.fire({
        html: `
          <div class="flex flex-col items-center gap-4 py-4">
            <div class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <h2 class="text-2xl font-bold text-white">Déconnexion...</h2>
            <p class="text-gray-400">Nettoyage en cours</p>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        background: 'rgba(0, 0, 0, 0.98)',
        backdrop: 'rgba(0, 0, 0, 0.85)',
        customClass: {
          popup: 'border-2 border-gray-500/30 rounded-2xl backdrop-blur-lg'
        }
      });

      // 2. Déconnexion avec NextAuth
      await authClient.signOut({
        fetchOptions: {
          // S'assurer que la requête n'est pas mise en cache
          cache: 'no-store',
        }
      });

      // 3. Nettoyer TOUS les storages locaux
      if (typeof window !== 'undefined') {
        // LocalStorage
        localStorage.clear();
        
        // SessionStorage
        sessionStorage.clear();
        
        // IndexedDB (si utilisé)
        if (window.indexedDB) {
          const databases = await window.indexedDB.databases();
          databases.forEach(db => {
            if (db.name) window.indexedDB.deleteDatabase(db.name);
          });
        }
        
        // Service Workers
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            await registration.unregister();
          }
        }
        
        // Cache API
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
      }

      // 4. Fermer le loader
      Swal.close();

      // 5. Afficher confirmation
      Swal.fire({
        html: `
          <div class="flex flex-col items-center gap-4 py-4">
            <div class="w-16 h-16 border-2 border-green-500/50 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Déconnecté !</h2>
            <p class="text-gray-400">Redirection en cours...</p>
          </div>
        `,
        timer: 1500,
        showConfirmButton: false,
        background: 'rgba(0, 0, 0, 0.98)',
        backdrop: 'rgba(0, 0, 0, 0.85)',
        customClass: {
          popup: 'border-2 border-green-500/30 rounded-2xl backdrop-blur-lg'
        }
      });

      // 6. Redirection FORCÉE (pas de cache)
      // Attendre un peu pour montrer le message de succès
      setTimeout(() => {
        // Force un hard reload pour vider tous les caches
        window.location.href = "/";
        // Alternative si vous préférez garder le router :
        // router.replace("/login");
        // setTimeout(() => window.location.reload(), 100);
      }, 1600);

    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      Swal.close();
      
      Swal.fire({
        html: `
          <div class="flex flex-col items-center gap-4 py-4">
            <div class="w-16 h-16 border-2 border-red-500/50 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Erreur</h2>
            <p class="text-gray-400">Échec de la déconnexion</p>
          </div>
        `,
        confirmButtonText: 'Réessayer',
        background: 'rgba(0, 0, 0, 0.98)',
        backdrop: 'rgba(0, 0, 0, 0.85)',
        customClass: {
          popup: 'border-2 border-red-500/30 rounded-2xl backdrop-blur-lg',
          confirmButton: 'bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        }
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all flex items-center gap-3 group/item"
    >
      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500 transition-colors">
        <svg 
          className="w-4 h-4 text-red-400 group-hover/item:text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
          />
        </svg>
      </div>
      <span className="font-semibold font-sans">Déconnexion</span>
    </button>
  );
}