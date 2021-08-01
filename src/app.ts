import express from 'express';
import config from 'config';
import log from '@src/logger';
import connect from '@src/db/connect';
import initRoutes from './routes';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initRoutes(app);

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);

  connect();
});
