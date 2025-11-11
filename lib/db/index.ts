// lib/db/index.ts
import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🗄️  Initialisation Drizzle");
console.log("  🔗 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Défini" : "❌ Manquant");

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Test de connexion
pool.query('SELECT NOW()')
  .then(() => console.log("  ✅ Connexion PostgreSQL réussie"))
  .catch((err) => console.error("  ❌ Erreur connexion PostgreSQL:", err.message));

const db = drizzle(pool, { schema });

console.log("  📦 Drizzle configuré avec:", Object.keys(schema).length, "tables");
console.log("  📋 Tables:", Object.keys(schema).join(", "));
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

export { pool };
export default db;