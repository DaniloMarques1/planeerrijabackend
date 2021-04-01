//import "reflect-metadata";
//import { createConnection } from 'typeorm';
import { App } from './app';

import {createTables} from './db/db';

async function start() {
  await createTables();
  const app = new App();
  app.run(8080);
}

start();

//createConnection().then(() => {
//  const app = new App();
//  app.run(8080);
//}).catch(error => console.log(error));
