import * as express from 'express';
import { routes } from './routes';

import * as cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
  }

  public run(): void {
    this.app.listen(process.env.PORT);
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }

}
