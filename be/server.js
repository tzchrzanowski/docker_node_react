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

async function waitForDatabaseConnection(retries = 10, delay= 2000) {
    for (let i=0; i< retries; i++) {
        try {
            await db.query('SELECT 1');
            console.log("MySQL is ready!");
            return;
        } catch(error) {
            console.log("Waiting for MySQL to be ready: ", i);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Couldnt connect to database. All attempts failed.');
}

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

app.post('/people', async(req, res) => {
    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, url } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO people (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, url]
        );

        res.status(201).json({
            message: "New person created in People table",
        });
    } catch (error) {
        console.log('Error adding person into people table.', error);
        res.status(500).json({error: "Couldnt insert into database."});
    }
});

app.delete('/people/:id', async (req, res) => {
    const personId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM people WHERE id = ?', [personId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Person to delete not found."});
        }
        res.status(200).json({message: "Person deleted successfully"});
    } catch (error) {
        console.error("Error while deleting person: ", error);
        res.status(500).json({error: "Couldnt delete person."});
    }
});

app.put('/people/:id', async(req, res) => {
    const personId = req.params.id;
    const updatedData = req.body;

    try {
        const fields = Object.keys(updatedData);
        const values = Object.values(updatedData);

        if (fields.length === 0) {
            return res.status(400).json({error: "Didnt update any fields."});
        }

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const query = `UPDATE people SET ${setClause} WHERE id = ?`;

        const [result] = await db.query(query, [...values, personId]);

        res.json({message: "Person updated successfully!"});
    } catch (error) {
        console.error('Error updating person: ', error);
        res.status(500).json({error: "Couldnt update person in database"});
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

app.post('/planets', async(req, res) => {
    const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, url } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO planets (name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, url]
        );

        res.status(201).json({
            message: "New person created in Planets table",
        });
    } catch (error) {
        console.log('Error adding planet into planets table.', error);
        res.status(500).json({error: "Couldnt insert into database."});
    }
});

app.delete('/planets/:id', async (req, res) => {
    const planetId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM planets WHERE id = ?', [planetId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Planet to delete not found."});
        }
        res.status(200).json({message: "Planet deleted successfully"});
    } catch (error) {
        console.error("Error while deleting planet: ", error);
        res.status(500).json({error: "Couldnt delete planet."});
    }
});

app.put('/planets/:id', async(req, res) => {
    const planetId = req.params.id;
    const updatedData = req.body;

    try {
        const fields = Object.keys(updatedData);
        const values = Object.values(updatedData);

        if (fields.length === 0) {
            return res.status(400).json({error: "Didnt update any fields."});
        }

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const query = `UPDATE planets SET ${setClause} WHERE id = ?`;

        const [result] = await db.query(query, [...values, planetId]);

        res.json({message: "Planet updated successfully!"});
    } catch (error) {
        console.error('Error updating person: ', error);
        res.status(500).json({error: "Couldnt update planet in database"});
    }
});
app.listen(PORT, async () => {
    console.log(`Backend sw api running at http://localhost:${PORT}`)
    await waitForDatabaseConnection();
    await populateDatabaseWithSWApi();
});