import "reflect-metadata";
import { createConnection } from 'typeorm';
import { App } from './app';

createConnection().then(() => {
  const app = new App();
  app.run(8080);
}).catch(error => console.log(error));
