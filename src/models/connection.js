import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DB_ELEPHANT;
const pool = new Pool({ connectionString });

export default pool;
