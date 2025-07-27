CREATE DATABASE IF NOT EXISTS swdb;
USE swdb;

CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    height INT,
    mass INT,
    hair_color VARCHAR(50),
    skin_color VARCHAR(50),
    eye_color VARCHAR(50),
    birth_year VARCHAR(10),
    gender VARCHAR(20),
    homeworld VARCHAR(255),
    films JSON,
    species JSON,
    vehicles JSON,
    starships JSON,
    created DATETIME,
    edited DATETIME,
    url VARCHAR(255)
);

CREATE TABLE starships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    model VARCHAR(100),
    manufacturer VARCHAR(150),
    cost_in_credits BIGINT,
    length FLOAT,
    max_atmosphering_speed VARCHAR(20),
    crew VARCHAR(50),
    passengers VARCHAR(50),
    cargo_capacity BIGINT,
    consumables VARCHAR(50),
    hyperdrive_rating FLOAT,
    MGLT VARCHAR(10),
    starship_class VARCHAR(50),
    pilots JSON,
    films JSON,
    created DATETIME,
    edited DATETIME,
    url VARCHAR(255)
);

CREATE TABLE planets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    rotation_period INT,
    orbital_period INT,
    diameter INT,
    climate VARCHAR(100),
    gravity VARCHAR(50),
    terrain VARCHAR(100),
    surface_water INT,
    population BIGINT,
    residents JSON,
    films JSON,
    created DATETIME,
    edited DATETIME,
    url VARCHAR(255)
);
