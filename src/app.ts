import express from 'express';
import swaggerUi from 'swagger-ui-express';
import initRoutes from './routes';
import swaggerConfig from '@src/swagger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default app;
