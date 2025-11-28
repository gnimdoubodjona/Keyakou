export interface Participation {
    id: number;
    challengeId: number;
    userId: string;
    joinedAt: Date;
    isActive: boolean;
    progression?: number;
    statut: string;
}

export interface ParticipationWithChallenge extends Participation {
    challenge: {
        id: number;
        titre: string;
        description: string;
        dateDebut: Date;
        dateFin: Date;
        statut: string;
    };
}

// interface de présentationd de données en bd
export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  points: number;
  avatar: string;
  progression: number;
  isYou: boolean;
}