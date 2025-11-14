
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authClient } from '@/lib/client';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const signInWithGithub = async () => { // ⚠️ async
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard", // Où rediriger après connexion
        //callbackURL: `${window.location.origin}/dashboard`,

      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };


  const handleGoogleLogin = () => {
    console.log("Connexion avec Google");
  };

    // Vérifie si l'utilisateur est connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si déjà connecté, redirige vers dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-transparent rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenue
            </h1>
            <p className="text-white">
              Connectez-vous pour continuer
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={signInWithGithub}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              <span>Continuer avec GitHub</span>
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-black" />
              <span>Continuer avec Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white">
              En vous connectant, vous acceptez nos conditions d'utilisation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}