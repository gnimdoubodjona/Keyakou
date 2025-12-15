"use client";
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // router.push("/authentication/login"); // Redirige vers la page d'accueil
      router.push("/"); // Redirige vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
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