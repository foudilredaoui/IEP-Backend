import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusEnum } from '@src/shared';
const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, 'user');

  if (!user) {
    return res.sendStatus(HttpStatusEnum.FORBIDDEN);
  }

  return next();
};

export default requiresUser;
