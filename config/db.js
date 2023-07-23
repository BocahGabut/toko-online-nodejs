import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const dbPool = mysql.createPool({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
})

export default dbPool;