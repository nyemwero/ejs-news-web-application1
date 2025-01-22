import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a new pool instance using the environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the single connection string for Render
  ssl: {
    rejectUnauthorized: false, // Required for Render's managed PostgreSQL
  },
});

export default pool;
