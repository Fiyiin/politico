import pool from './connection';

const migration = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    othername TEXT,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    passport_url TEXT,
    is_admin BOOLEAN
  );
  DROP TABLE IF EXISTS parties CASCADE;
  CREATE TABLE parties(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    hq_address TEXT NOT NULL,
    logo_url TEXT
  );
  DROP TABLE IF EXISTS offices CASCADE;
  CREATE TABLE offices(
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL
  );
  DROP TABLE IF EXISTS candidates CASCADE;
  CREATE TABLE candidates(
    id SERIAL PRIMARY KEY, 
    office INTEGER REFERENCES offices(id) UNIQUE,
    party INTEGER REFERENCES parties(id) UNIQUE, 
    candidate INTEGER REFERENCES users(id) UNIQUE
  );
  DROP TABLE IF EXISTS votes CASCADE;
  CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    created_on VARCHAR NOT NULL,
    created_by INTEGER REFERENCES users(id),
    office INTEGER REFERENCES offices(id),
    candidate INTEGER REFERENCES candidates(id)
  );
`;

pool.query(migration).then((resp) => {
  console.log(resp);
}).catch((error) => {
  console.log(error);
});
