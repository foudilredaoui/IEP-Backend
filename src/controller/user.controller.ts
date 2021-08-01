import { Router, Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import validateRequest from '@src/middleware/validateRequest';
import createUserSchema from '@src/schema/user.schema';
import * as userService from '@src/service/user.service';
import { Controller, HttpStatusEnum } from '@src/shared';
import log from '@src/logger';

class UserController implements Controller {
  path = '/user';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.get('/', this.findAll);
    this.route.get('/:id', this.findOne);
    this.route.post('/', validateRequest(createUserSchema), this.create);
  }

  create = async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(HttpStatusEnum.CREATED).json({ message: 'User was created succesfully', data: user });
    } catch (e) {
      log.error('🔥 error: %o', e);
      return res.status(HttpStatusEnum.CONFLICT).send(e.message);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.findAllUsers({});
      return res.status(HttpStatusEnum.SUCCESS).json({ message: 'Users list fetched succesfully', data: users });
    } catch (e) {
      log.error('🔥 error: %o', e);
      return next(e);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = get(req, 'params.id');
      const user = await userService.getUser({ _id: userId });
      return res.status(HttpStatusEnum.SUCCESS).json({ message: 'User was found succesfully', data: user });
    } catch (e) {
      log.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default UserController;
