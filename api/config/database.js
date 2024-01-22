import pgp from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'database',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
};

const pgPromise = pgp();
const db = pgPromise(dbConfig);

export default db;
