import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authClient } from '@/lib/client';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

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

  return <LoginForm />;
}