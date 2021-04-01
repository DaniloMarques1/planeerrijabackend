import axios, {AxiosInstance} from 'axios';
import {pool} from '../db/db';

function getRequest(url: string = 'http://127.0.0.1:8080'): AxiosInstance {
  return axios.create({baseURL: url});
}

afterEach(async (done) => {
  await pool.query("truncate table appointment");
  done();
});

afterAll(async (done) => {
  await pool.end();
  done();
});

test('Should make an appointment', async () => {
  const request = getRequest();
  const body = {owner_name: 'Fitz', pet_name: 'Aurora', pet_type: 'CAT', description: 'Consulta de rotina'};
  const response = await request.post('/appointment', body);

  expect(response.status).toBe(201);
  expect(response.data.owner_name).toBe('Fitz');
});
