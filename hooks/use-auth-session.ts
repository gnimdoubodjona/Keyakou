// hooks/use-auth-session.ts
"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
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
        
        if (data.data?.user) {
          setUser(data.data.user);
        }
      } catch (error) {
        console.error("Erreur session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return { user, loading };
}