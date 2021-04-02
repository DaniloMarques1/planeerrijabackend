import {Request, Response, NextFunction} from 'express';
import {GeneralError} from '../utils/generalError';
import {Helper} from '../utils/helper';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = <string>req.headers["authorization"]
  console.log(auth);
  if (!auth)
    return res.status(401).json(new GeneralError("Missing token"));
  const token = auth.split(" ")[1];
  const employeeId = Helper.getPayload(token);
  req.headers["id"] = employeeId;

  return next();
}
