import pool from './connection';

const migration = `
  CREATE TABLE IF NOT EXISTS users(
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
  
  CREATE TABLE IF NOT EXISTS parties(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    hq_address TEXT NOT NULL,
    logo_url TEXT
  );
  
  CREATE TABLE IF NOT EXISTS offices(
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL
  );
  DROP TABLE IF EXISTS candidates CASCADE;
  CREATE TABLE candidates(
    id SERIAL, 
    office INTEGER REFERENCES offices(id),
    party INTEGER REFERENCES parties(id), 
    candidate INTEGER REFERENCES users(id),
    PRIMARY KEY (candidate, office)
  );
  DROP TABLE IF EXISTS votes CASCADE;
  CREATE TABLE votes(
    id SERIAL,
    created_on VARCHAR NOT NULL,
    created_by INTEGER REFERENCES users(id),
    office INTEGER,
    candidate INTEGER,
    FOREIGN KEY (candidate, office) REFERENCES candidates (candidate,office),
    PRIMARY KEY (office, created_by)
  );
`;

pool.query(migration).then((resp) => {
  console.log(resp);
}).catch((error) => {
  console.log(error);
});
