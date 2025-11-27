
import { getUserChallenges } from "@/app/dashboard/action";
import { useState, useEffect } from "react";


export interface UserChallenge {
  id: string;
  title: string;
  slug: string;
  joinedAt: string;
  isActive: boolean;
  progression?: number;
}

export function useUserChallenges() {
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const userChallenges = await getUserChallenges();
      setChallenges(userChallenges);
    } catch (error) {
      console.error("Erreur chargement challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setLoading(true);
    try {
      const userChallenges = await getUserChallenges();
      setChallenges(userChallenges);
    } catch (error) {
      console.error("Erreur rechargement challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  return { challenges, loading, refetch };
}