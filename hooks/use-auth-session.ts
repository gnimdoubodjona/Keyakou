// hooks/use-auth-session.ts
"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // ← Important
  image?: string;
}

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await fetch("/api/auth/get-session");
        const data = await response.json();
        
        // console.log("📦 Data reçue:", data);
        // console.log("👤 Role de l'utilisateur:", data.user?.role); // ← Debug
        
        if (data.user) {
          // ✅ IMPORTANT : Assure-toi que le role est bien inclus
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role || "user", // ← AJOUTÉ
            image: data.user.image,
          });
        } else {
          console.log("❌ Pas de user");
        }
      } catch (error) {
        console.error("❌ Erreur session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return { user, loading };
}
