import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";



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


// schema pour challenge
export const challenge = pgTable("challenge", {
    id: text("id").primaryKey(),
    titre: text("titre").notNull(),
    description: text("description").notNull(),
    nombrePersonne: integer("nombreP").notNull(),
    regles: text("regles").notNull(),
    sujet: text("sujet").notNull(),
    pourcentageVote: integer("pourcentageVote").default(100),
    dateDebut: timestamp("dateDebut").notNull(),
    dateFin: timestamp("dateFin").notNull(),
    statut: text("statut").default("en_ attente"),
    createdBy: text("createdBy").notNull().references(() => user.id),
});