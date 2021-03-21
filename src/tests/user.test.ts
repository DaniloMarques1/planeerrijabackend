import { Connection, createConnection } from 'typeorm';
import { UserBody } from '../interfaces/UserBody';
import axios, { AxiosInstance } from 'axios';
import {Login} from '../interfaces/Login';
import {JobType} from '../entity/Employee';


function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

async function getDatabaseConnection(): Promise<Connection> {
  const connection = await createConnection({
    type: 'postgres',
    url: 'postgres://fitz:123456@0.0.0.0:5433/planeerrija'
  });

  return connection;
}

describe("It will sign up and sign in a user", () => {

  afterEach(async () => {
    const connection = await getDatabaseConnection();
    await connection.query('truncate table employee');
    await connection.close();
  });

  test("Should sign up a user", async () => {
    const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
    const request = getRequest();
    const response = await request.post('/employee', user);

    expect(response.status).toBe(201);
    expect(response.data.employee.name).toBe("Fitz");
    expect(response.data.employee.type).toBe("VET");
  });

  test("Should not sign up a user", async () => {
    try {

      const user = {name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "BET"};
      const request = getRequest();
      await request.post('/employee', user);

    } catch(e) {
      expect(e.response.status).toBe(400);
      expect(e.response.data).toBeDefined();
    }
  });

  test("Should sign in a user and get a token back", async () => {
    const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
    const request = getRequest();
    await request.post('/employee', user);

    const login = <Login>{email: 'fitz@gmail.com', password: '123456'}; 
    const response = await request.post('/session', login);

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    expect(response.data.employee).toBeDefined();
  });

  test("Should return 400 because of invalid email", async () => {
    try {
      const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
      const request = getRequest();
      await request.post('/employee', user);

      const login = <Login>{email: 'dan@gmail.com', password: '123456'}; 

      await request.post('/session', login);
    } catch(e) {
      expect(e.response.status).toBe(400);
      expect(e.response.data.message).toBe("Invalid email");
    }
  
  });

  test("Should return 400 because of invalid password", async () => {
    try {
      const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
      const request = getRequest();
      await request.post('/employee', user);

      const login = <Login>{email: 'fitz@gmail.com', password: 'fitz'}; 
      await request.post('/session', login);

    } catch(e) {
      expect(e.response.status).toBe(400);
      expect(e.response.data.message).toBe("Invalid password");
    }
  });
});
