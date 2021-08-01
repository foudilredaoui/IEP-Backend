import { Router, Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { createHobbiesSchema, deleteHobbiesSchema } from '@src/schema/hobbies.schema';
import * as hobbiesService from '@src/service/hobbies.service';
import { getUser, deleteUserHobbies, updateHobbies } from '@src/service/user.service';
import validateRequest from '@src/middleware/validateRequest';
import { Controller, HttpStatusEnum } from '@src/shared';
import log from '@src/logger';

class HobbiesController implements Controller {
  path = '/hobbies';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.post('/:userId', validateRequest(createHobbiesSchema), this.create);
    this.route.delete('/:userId/:id', validateRequest(deleteHobbiesSchema), this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = get(req, 'params.userId');
      const user = getUser({ id: userId });
      if (!user) {
        return res.sendStatus(HttpStatusEnum.NOT_FOUND);
      }
      const hobbies = await hobbiesService.createHobbies(req.body);
      const id: string = get(hobbies, '_id');
      await updateHobbies({ _id: userId }, { hobbies: id });
      return res.status(HttpStatusEnum.CREATED).json({ message: 'Hobbies was created succesfully', data: hobbies });
    } catch (e) {
      log.error('🔥 error: %o', e);
      return next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = get(req, 'params.userId');
      const hobbiesId: string = get(req, 'params.id');

      const user = getUser({ id: userId });
      if (!user) {
        return res.sendStatus(HttpStatusEnum.NOT_FOUND);
      }

      await hobbiesService.deleteHobbies({ _id: hobbiesId });
      const updatedUser = deleteUserHobbies({ id: userId }, { hobbies: hobbiesId }, { new: true });
      return res.status(HttpStatusEnum.SUCCESS).json({ message: 'Hobbies removed  succesfully', data: updatedUser });
    } catch (e) {
      log.error('🔥 error: %o', e);
      return next(e);
    }
  };
}
export default HobbiesController;
