import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    // Test connexion basique
    const result = await pool.query('SELECT NOW() as time');
    console.log('✅ Connexion Postgres OK');
    console.log('Timestamp from DB:', result.rows[0].time);

    // Test Drizzle
    const db = drizzle(pool);
    console.log('✅ Instance Drizzle créée');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();