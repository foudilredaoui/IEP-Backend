import mongoose from 'mongoose';
import config from 'config';
import log from '@src/logger';

function connect(): Promise<void> {
  const dbUri = config.get('dbUri') as string;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('Database connected');
    })
    .catch(error => {
      log.error('db error', error);
      process.exit(1);
    });
}

export default connect;
