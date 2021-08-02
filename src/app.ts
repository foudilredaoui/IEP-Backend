import express from 'express';
import initRoutes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initRoutes(app);

export default app;
