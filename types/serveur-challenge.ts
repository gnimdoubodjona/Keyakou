import { ChallengeWithCreator } from "./challenge";
import { LeaderboardUser, Participation } from "./participation";

export interface ServeurChallengeData {
  challenge: ChallengeWithCreator;
  userParticipation: Participation;
  totalParticipants: number;
  userRank: number;
  leaderboard: LeaderboardUser[];

}


export { ChallengeWithCreator, LeaderboardUser };
// export { LeaderboardUser, ChallengeWithCreator };
