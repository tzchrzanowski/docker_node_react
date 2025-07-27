const axios = require('axios');
const { db } = require('./db');

async function fetchAll(endpoint) {
    const allData = [];
    let url = endpoint;

    while (url) {
        const res = await axios.get(url);
        allData.push(...res.data);
        url = res.data.next;
    }
    return allData;
}

async function insertPlanets(planets) {
    for (const p of planets) {
        await db.execute(
            `INSERT IGNORE INTO planets
            (name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, residents, films, created, edited, url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                p.name,
                parseInt(p.rotation_period) || null,
                parseInt(p.orbital_period) || null,
                parseInt(p.diameter) || null,
                p.climate,
                p.gravity,
                p.terrain,
                parseFloat(p.surface_water) || null,
                parseInt(p.population) || null,
                JSON.stringify(p.residents),
                JSON.stringify(p.films),
                new Date(p.created),
                new Date(p.edited),
                p.url
            ]
        );
    }
}


async function insertPeople(people) {
    for (const p of people) {
        await db.execute(
            `INSERT IGNORE INTO people  
            (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                p.name,
                parseInt(p.height) || null,
                parseInt(p.mass) || null,
                p.hair_color,
                p.skin_color,
                p.eye_color,
                p.birth_year,
                p.gender,
                p.homeworld,
                JSON.stringify(p.films),
                JSON.stringify(p.species),
                JSON.stringify(p.vehicles),
                JSON.stringify(p.starships),
                new Date(p.created),
                new Date(p.edited),
                p.url,
            ]
        );
    }
};

async function insertStarships(starships) {
    for (const s of starships) {
        await db.execute(
            `INSERT IGNORE INTO starships
            (name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class, pilots, films, created, edited, url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                s.name,
                s.model,
                s.manufacturer,
                parseInt(s.cost_in_credits) || null,
                parseFloat(s.length) || null,
                s.max_atmosphering_speed,
                parseInt(s.crew) || null,
                parseInt(s.passengers) || null,
                parseInt(s.cargo_capacity) || null,
                s.consumables,
                parseFloat(s.hyperdrive_rating) || null,
                parseInt(s.MGLT) || null,
                s.starship_class,
                JSON.stringify(s.pilots),
                JSON.stringify(s.films),
                new Date(s.created),
                new Date(s.edited),
                s.url
            ]
        );
    }
}

module.exports = { fetchAll, insertPlanets, insertPeople, insertStarships };