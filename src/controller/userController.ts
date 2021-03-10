import { Request, Response } from 'express';
import { UserService } from '../service/userService';
import { GeneralError } from '../utils/generalError';

export class UserController {
  async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const {name, email, password, birthDate} = req.body;
      const user = await UserService.addUser({name, email, password, birthDate});

      return res.json({user});
    } catch(e) {
      console.log(typeof(e));
      if (e instanceof GeneralError) {
        return res.status(400).json(e);
      }

      return res.status(400).json({message: 'Unexpected error'});
    }
  }
}
