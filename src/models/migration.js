import pool from './connection';

const migration = `
DROP TABLE IF EXISTS candidates CASCADE;

CREATE TABLE candidates (
  id SERIAL,
  office_id integer REFERENCES offices(id),
  party_id integer REFERENCES parties(id),
  user_id integer REFERENCES users(id),
  PRIMARY KEY (office_id, user_id)
);

/*Table structure for table offices */

DROP TABLE IF EXISTS offices CASCADE;

CREATE TABLE offices (
  id SERIAL,
  type text NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (id)
);

/*Table structure for table parties */

DROP TABLE IF EXISTS parties CASCADE;

CREATE TABLE parties (
  id SERIAL,
  name varchar(20) DEFAULT NULL,
  hq_address varchar(255) DEFAULT NULL,
  logo_url text,
  PRIMARY KEY (id)
);

/*Table structure for table users */

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL,
  firstname varchar(20) DEFAULT NULL,
  lastname varchar(20) DEFAULT NULL,
  othername varchar(20) DEFAULT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  password varchar(100) NOT NULL,
  phone_number varchar(15) DEFAULT NULL,
  passport_url text,
  is_admin BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

/*Table structure for table votes */

DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE votes (
  id SERIAL,
  created_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id integer,
  office_id integer,
  candidate_id integer NOT NULL,
  PRIMARY KEY (user_id, office_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE
);
`;

pool.query(migration).then((resp) => {
  console.log(resp);
}).catch((error) => {
  console.log(error);
});
