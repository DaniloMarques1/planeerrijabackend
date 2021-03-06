import { Request, Response } from 'express';
import {getRepository} from 'typeorm';

import {User} from '../entity/User';

export class UserController {
  async addUser(req: Request, res: Response): Promise<Response> {
    // TODO: adicionar validacao com o ajv
    const {name, email, password, birthDate} = req.body;
    const user = new User(name, email, birthDate);
    user.passwordHash = user.hashPassword(password);

    const userRepository = getRepository(User);
    userRepository.save(user);

    return res.json({user});
  }
}
