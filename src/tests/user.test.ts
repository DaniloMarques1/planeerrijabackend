import { getConnection } from 'typeorm';
import {UserBody} from '../interfaces/UserBody';
import axios, {AxiosInstance} from 'axios';

afterEach(async () => {
  const connection = getConnection();
  await connection.query('truncate table "users"');
});

function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

describe("It will sign up and sign in a user", () => {
  const connection = getConnection();

  test("Should sign up a user", async () => {
    // TODO
    const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", birthDate: "1999-27-06"};
    const request = getRequest();
    const response = await request.post('/user', user);

    expect(response.status).toBe(201);
    expect(response.data.user.name).toBe("Fitz");
  });

  test("Should sign in a user and get a token back", () => {
    // TODO
  });
});
