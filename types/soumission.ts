export interface SoumissionComplete {
  id: string;
  participationId: string;
  url: string | null;
  snippet: string | null;
  demo: string | null;
  projet_url: string | null;
  capture_ecran: string | null;
  statut: "en_attente" | "valide" | "rejete";
  commentaire_de_soumission: string | null;
  dateSoumission: Date;
  
  // Jointures
  challengeId: string;
  userId: string;
  progression: number;
  userName: string | null;
  userEmail: string;
  userImage: string | null;
  challengeTitre: string;
}