import { Express } from 'express';
import { UserController, HobbiesController } from '@src/controller';
import { Controller } from '@src/shared';

const URL_PREFIX = '/api/v1';

export default (app: Express): void => {
  const controllers: Controller[] = [new UserController(), new HobbiesController()];

  controllers.forEach(controller => {
    app.use(URL_PREFIX + controller.path, controller.route);
  });
};
