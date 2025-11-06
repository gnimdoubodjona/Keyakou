import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Create a pg Pool and pass it to Drizzle's node-postgres adapter.
// Passing the connection string directly to drizzle is incorrect for the
// node-postgres adapter; drizzle expects a Pool or Client instance.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = drizzle(pool);

export { pool };
export default db;