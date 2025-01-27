const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

// Test connection
(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected at:', res.rows[0].now);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

module.exports = pool;
