import axios, {AxiosInstance} from 'axios';
import {pool} from '../db/db';

function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

afterEach(async (done) => {
  await pool.query("truncate table appointment cascade");
  await pool.query("truncate table employee cascade");
  done();
});

afterAll(async (done) => {
  await pool.end();
  done();
});

test('Should make an appointment', async () => {
  const request = getRequest();
  // creating a new employee
  const employee = {name: "fitz", email: "fitz@gmail.com", password: "123456", type: "REC"};
  const employeeResponse = await request.post("employee", employee);

  // sign in with the new employee 
  const session = {email: "fitz@gmail.com", password: "123456"};
  const sessionResponse = await request.post("/session", session);

  // creating a new appointment
  const token = sessionResponse.data.token;
  const body = {owner_name: 'Fitz', pet_name: 'Aurora', pet_type: 'CAT', description: 'Consulta de rotina'};
  const response = await request.post('/appointment', body, {headers: {
    token: `Bearer ${token}`
  }});

  expect(response.status).toBe(201);
  expect(response.data.owner_name).toBe('Fitz');
  expect(response.data.employee_id).toBe(employeeResponse.data.employee.id);
});

test("Should return all active appointments", async () => {
  const request = getRequest();
  // creating a new employee
  const employee = {name: "fitz", email: "fitz@gmail.com", password: "123456", type: "REC"};
  await request.post("employee", employee);

  // sign in with the new employee 
  const session = {email: "fitz@gmail.com", password: "123456"};
  const sessionResponse = await request.post("/session", session);

  const token = sessionResponse.data.token;
  const appointment1 = {owner_name: 'Fitz', pet_name: 'Aurora', pet_type: 'CAT', description: 'Consulta de rotina'};
  await request.post('/appointment', appointment1, {headers: {
    token: `Bearer ${token}`
  }});

  const appointment2 = {owner_name: 'Fitz', pet_name: 'Aurora', pet_type: 'CAT', description: 'Consulta de rotina'};
  await request.post('/appointment', appointment2, {headers: {
    token: `Bearer ${token}`
  }});

  const appointmentsResponse = await request.get("/appointment", {headers: {token: `Bearer ${token}`}});

  expect(appointmentsResponse.status).toBe(200);
  expect(appointmentsResponse.data.length).toBe(2);
});
