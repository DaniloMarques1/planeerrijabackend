import { Client, Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// TODO fix the type creation
const jobType = `
  CREATE TYPE  JobType AS ENUM('VET', 'REC');
`;

// TODO fix the type creation
const petType = `
  CREATE TYPE PetType AS ENUM('CAT', 'DOG');
`;

const tables = `
  CREATE TABLE IF NOT EXISTS employee(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    type jobtype
  );

  CREATE TABLE IF NOT EXISTS appointment(
    id SERIAL PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    pet_type pettype,
    description text
  );
`

//const client = new Client({
//    host: process.env.DB_HOST,
//    port: Number(process.env.DB_PORT),
//    user: process.env.DB_USER,
//    password: process.env.DB_PWD,
//    database: process.env.DB_NAME
//});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

async function createTables() {
  await pool.query(tables);
}

/*
function createTables(): Promise<any> {
  //return client.query(tables);
}

async function connect() {
  //await client.connect();
  //await createType();
  await createTables();
}
*/

export { pool, createTables } 