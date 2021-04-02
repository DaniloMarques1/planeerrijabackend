import { UserBody } from '../interfaces/UserBody';
import axios, { AxiosInstance } from 'axios';
import { pool } from '../db/db';


function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

afterEach(async (done) => {
  await pool.query("truncate table employee cascade");
  done();
});

afterAll(async (done) => {
  await pool.end();
  done();
});

test("Should sign up a employee", async () => {
  const user = <UserBody>{name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
  const request = getRequest();
  const response = await request.post('/employee', user);

  expect(response.status).toBe(201);
  expect(response.data.employee.name).toBe("Fitz");
});

test("Should not sign up the employee", async () => {
  try {
    await pool.query("insert into employee(name, email, password_hash, type) values('Fitz', 'fitz@gmail.com', '29309130', 'VET')");
    const user = {name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
    const request = getRequest();
    await request.post('/employee', user);
  } catch(e) {
    expect(e.response.status).toBe(400);
    expect(e.response.data.message).toBe("Email already used");
  }
});

test("Should sign in", async () => {
  const user = {name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
  const request = getRequest();
  let response = await request.post('/employee', user);
  const login = {email: "fitz@gmail.com", password: "123456"};

  response = await request.post("/session", login);

  expect(response.status).toBe(200);
  expect(response.data.token).toBeDefined();
});


test("Should not sign in", async () => {
  const user = {name: "Fitz", email: "fitz@gmail.com", password: "123456", type: "VET"};
  const request = getRequest();
  await request.post('/employee', user);
  const login = {email: "fit@gmail.com", password: "123456"};

  try {
    await request.post("/session", login);
  } catch(e) {
    expect(e.response.status).toBe(400);
    expect(e.response.data.message).toBe("Invalid email");
  }
});
