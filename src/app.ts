import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes'

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes)


// Listen to port
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
