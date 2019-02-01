import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;

const pool = new Pool({
  connectionString: config[env].database,
});


pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to db');
});


const query = (text, params, callback) => pool.query(text, params, callback);

export default query;
