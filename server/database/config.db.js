import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to db');
});


pool.on('remove', () => {
  // eslint-disable-next-line no-console
  console.log('removed from db');
});

const query = (text, params, callback) => pool.query(text, params, callback);

export default query;
