export interface Challenge {
  id: number;
  titre: string;
  description: string;
  nombrePersonne: number;
  pourcentageVote: number;
  regles: string | null;
  dateDebut: string;   // ou Date si tu préfères
  dateFin: string;
  createdBy: string;   // id du user ou email selon ta logique
  createdAt: string;   // timestamps
  statut: string;
}
