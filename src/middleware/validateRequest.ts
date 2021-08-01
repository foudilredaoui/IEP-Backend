import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusEnum } from '@src/shared';
import log from '@src/logger';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    log.error(e);
    return res.status(HttpStatusEnum.BAD_REQUEST).send(e.errors);
  }
};

export default validate;
