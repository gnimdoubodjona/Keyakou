"use client";  // ✅ Maintenant c'est OK

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authClient } from '@/lib/client';

export default function LoginForm() {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenue
            </h1>
            <p className="text-white">
              Connectez-vous pour continuer
            </p>
          </div>

          <div className="space-y-4">
            {/* Bouton GitHub */}
            <button
              onClick={signInWithGithub}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              <span>Continuer avec GitHub</span>
            </button>

            {/* Bouton Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3.5 px-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-black" />
              <span>Continuer avec Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/70">
              En vous connectant, vous acceptez nos conditions d'utilisation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

