import 'express-async-errors'
import express, { Application} from 'express';
import { errorMiddleware } from './middleware/error';
import authRoutes from './routes/auth.routes'

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorMiddleware);
  }

  private configureRoutes(): void {
    this.app.use('/', authRoutes);
  }

  private startServer(): void {
    const port = 3001;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

new App();
