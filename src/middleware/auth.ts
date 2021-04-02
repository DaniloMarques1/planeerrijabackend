import {Request, Response, NextFunction} from 'express';
import {GeneralError} from '../utils/generalError';
import {Helper} from '../utils/helper';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = <string>req.headers["token"]
  if (!tokenHeader)
    return res.status(401).json(new GeneralError("Missing token"));
  const token = tokenHeader.split(" ")[1];
  const employeeId = Helper.getPayload(token);
  req.headers["id"] = employeeId;

  return next();
}
