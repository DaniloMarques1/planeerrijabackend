import { Request, Response } from 'express';
import { UserService } from '../service/userService';
import { GeneralError } from '../utils/generalError';
import {Login} from '../interfaces/Login';

export class UserController {
  async addUser(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body);
      const user = await UserService.addUser(req.body);
      return res.status(201).json({user});
    } catch(e) {
      if (e instanceof GeneralError) {
        return res.status(400).json(e);
      }

      return res.status(400).json({message: 'Unexpected error'});
    }
  }

  async createSession(req: Request, res: Response): Promise<Response> {
    try {
      const payload = await UserService.createSession(req.body);
      return res.json(payload);
    } catch(e) {
      // TODO
    }

    return res.status(400).json({});
  }

}
