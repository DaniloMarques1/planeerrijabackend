import * as express from 'express';
import { routes } from './routes';

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
    // TODO cors
    this.app.use(express.json());
    this.app.use(routes);
  }
}
