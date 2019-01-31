import pool from './connection';

const migration = [
  `DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    othername TEXT,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    phone_number VARCHAR(15),
    passport_url TEXT,
    is_admin BOOLEAN
  );`,

  `DROP TABLE IF EXISTS parties;
  CREATE TABLE parties(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    hq_address TEXT NOT NULL,
    logo_url TEXT
  );`

  `DROP TABLE IF EXISTS offices;
  CREATE TABLE offices(
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL
  );`

  `DROP TABLE IF EXISTS candidates;
  CREATE TABLE candidates(
    id SERIAL PRIMARY KEY, 
    office INTEGER REFERENCES offices(id),
    party INTEGER REFERENCES parties(id), 
    candidate INTEGER REFERENCES users(id)
  );`

  `DROP TABLE IF EXISTS votes;
  CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    created_on VARCHAR NOT NULL,
    created_by INTEGER REFERENCES users(id),
    office INTEGER REFERENCES offices(id),
    candidate INTEGER REFERNCES candidates(candidate)
  );`

  `DROP TABLE IF EXISTS petitons;
  CREATE TABLE petitions(
    id SERIAL PRIMARY KEY,
    created_on VARCHAR NOT NULL,
    created_by INTEGER REFERENCES users(id),
    office INTEGER REFERENCES offices(id),
    body TEXT NOT NULL
  );`
];

migration.forEach(query => pool.query(query, error => console.log(error)));
