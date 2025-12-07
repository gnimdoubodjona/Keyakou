import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  // Vérifie si l'utilisateur est connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si connecté, redirige vers dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Sinon, affiche la page d'accueil
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur CodeLLenge</h1>
        <p className="mb-8">La plateforme de défis de code</p>
        
        
      </div>
    </div>
  );
}