import * as express from 'express';
import { routes } from './routes';

import * as cors from 'cors';


export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
  }

  public run(port: number): void {
    this.app.listen(port);
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }

}
