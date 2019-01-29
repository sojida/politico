import dotenv from 'dotenv';

dotenv.config();

export default {
  dev: {
    database: process.env.DATABASE_URL,
  },
  test: {
    database: process.env.DATABASE_URL_TEST,
  },
  production: {
    database: process.env.DATABASE_URL,
  },
};
