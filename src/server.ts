import config from 'config';
import log from '@src/logger';
import connect from '@src/db/connect';
import app from '@src/app';

const port = config.get('port') as number;
const host = config.get('host') as string;

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);

  connect();
});
