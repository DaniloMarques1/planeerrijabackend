import { Connection, createConnection } from 'typeorm';
import { UserBody } from '../interfaces/UserBody';
import axios, { AxiosInstance } from 'axios';
import {Login} from '../interfaces/Login';


function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

async function getDatabaseConnection(): Promise<Connection> {
  const connection = await createConnection({
    type: 'postgres',
    url: 'postgres://postgres:123456@0.0.0.0/planeerrija'
  });

  return connection;
}

describe("It will sign up and sign in a user", () => {

  afterEach(async () => {
    const connection = await getDatabaseConnection();
    await connection.query('truncate table "user"');
    await connection.close();
  });

  test("Should sign up a user", async () => {
    // TODO
    const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", birthDate: "1999-06-27"};
    const request = getRequest();
    const response = await request.post('/user', user);

    expect(response.status).toBe(201);
    expect(response.data.user.name).toBe("Fitz");
  });

  test("Should sign in a user and get a token back", async () => {
    // TODO
    const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", birthDate: "1999-06-27"};
    const request = getRequest();
    await request.post('/user', user);

    const login = <Login>{email: 'fitz@gmail.com', password: '123456'}; 
    const response = await request.post('/session', login);

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });
});
