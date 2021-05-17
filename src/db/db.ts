import { Pool } from 'pg';
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
    description text,
    active BOOLEAN DEFAULT true,
    consult_created_date timestamp default now(),
    consult_over_date timestamp,
    employee_id INT,
    CONSTRAINT fk_employee_id FOREIGN KEY(employee_id) REFERENCES employee(id)
  );
`

/*
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  //await pool.query(jobType);
  //await pool.query(petType);
  await pool.query(tables);
}

export { pool, createTables } 
