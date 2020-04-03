import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Routes } from './config/routes';
import { createDatabase } from './config/database';

class App {
  public app: express.Application;
  public configRoutes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.configRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    createDatabase();
  }
}

export default new App().app;
