import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";


// Tables pour Better Auth
export const user = pgTable("user", {  // ⚠️ "user" au singulier
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


export const regles = pgTable("regles", {
  id: text("id").primaryKey(),
  description: text("description").notNull(),
  challengeId: text("challenge_id").notNull().references(() => challenge.id, { onDelete: "cascade" }),
});

export const regleSuivi= pgTable("regle_suivi", {
  id: text("id").primaryKey(),
  participationId: text("participation_id").notNull().references(() => participation.id, { onDelete: "cascade" }),
  regleId: text("regle_id").notNull().references(() => regles.id, { onDelete: "cascade" }),
  statut: boolean("Validé").default(false),
  validerA: timestamp("validerA").notNull().defaultNow(),
})

// schema pour challenge
export const challenge = pgTable("challenge", {
  id: text("id").primaryKey(),
  titre: text("titre").notNull(),
  description: text("description").notNull(),
  nombrePersonne: integer("nombreP").notNull(),
  pourcentageVote: integer("pourcentageVote").default(100),
  dateDebut: timestamp("dateDebut").notNull(),
  dateFin: timestamp("dateFin").notNull(),
  statut: text("statut").default("en_ attente"),
  createdBy: text("createdBy").notNull().references(() => user.id),
});


// schema pour participation au challenge
export const participation = pgTable("participation", {
  id: text("id").primaryKey(),
  challengeId: text("challengeId").notNull().references(() => challenge.id),
  userId: text("userId").notNull().references(() => user.id),
  progression: integer("progression").default(0),
  statut: text("statut").default("en_cours"),
  //pour le moment je m'arrête là
  joinedAt: timestamp("joinedAt").notNull().defaultNow(), // ⬅️ AJOUTÉ
  isActive: boolean("isActive").notNull().default(true), // ⬅️ AJOUTÉ
}
)



export const soumissions = pgTable("soumissions", {
  id: text("id").primaryKey(),
  participationId: text("participationId")
    .notNull()
    .references(() => participation.id),

  url: text("url"),                         // Lien GitHub
  snippet: text("snippet"),                 // Code snippet
  demo: text("demo"),                       // URL vidéo
  projet_url: text("projet_url"),           // URL du projet
  capture_ecran: text("capture_ecran"),     // URL image

  statut: text("statut", {
    enum: ["en_attente", "valide", "rejete"],
  }).default("en_attente"),

  commentaire_de_soumission: text("commentaire_de_soumission"),

  dateSoumission: timestamp("date_soumission").defaultNow(),
});

