const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const axios = require('axios');
const { db } = require('./db.js');
const { fetchAll, insertPeople, insertStarships, insertPlanets } = require('./populateDatabase.js');

const app = express();
const PORT = 5031;

app.use(cors());
app.use(express.json());

async function populateDatabaseWithSWApi() {
    try {
        const [people, planets, starships] = await Promise.all([
            fetchAll('https://swapi.info/api/people'),
            fetchAll('https://swapi.info/api/planets'),
            fetchAll('https://swapi.info/api/starships'),
        ]);

        await insertPeople(people);
        await insertPlanets(planets);
        await insertStarships(starships);
    } catch (error) {
        console.error('Getting data from sw api failed..', error);
    }
}

app.get('/people', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM people');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.get('/starships', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM starships');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.get('/planets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM planets');
        res.json(rows);
    } catch (error) {
        console.log('Error querying db', error);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.listen(PORT, async () => {
    console.log(`Backend sw api running at http://localhost:${PORT}`)
    await populateDatabaseWithSWApi();
});


