const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const PORT = 5031;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'pwd123456',
    database: process.env.DB_NAME || 'swdb',
});

app.get('/people', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM people');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.get('/starships', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM starships');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.get('/planets', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM planets');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend sw api running at http://localhost:${PORT}`)
});


