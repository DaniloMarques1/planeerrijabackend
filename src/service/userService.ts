import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserBody } from '../interfaces/UserBody';
import { Helper } from '../utils/helper';
import { GeneralError } from '../utils/generalError';
import {userRegisterSchema} from '../schemas/UserRegister';
import {userLoginSchema} from '../schemas/UserLogin';
import { Login } from '../interfaces/Login';
import * as jwt from 'jsonwebtoken';
import {Constants} from '../utils/constants';
import {Payload} from '../interfaces/Payload';

export class UserService {
  static async addUser(userBody: UserBody): Promise<User> {
    const errors = Helper.validateData(userBody, userRegisterSchema);
    if (errors && errors .length > 0) {
      console.log(errors);
      throw new GeneralError('Invalid body', Helper.getErrors(errors));
    }

    const userRepository = getRepository(User);
    const userExist =  await userRepository.findOne({email: userBody.email});
    if (userExist) {
      throw new GeneralError('Email already used');
    }

    const user = new User(userBody.name, userBody.email, userBody.birthDate);
    user.passwordHash = user.hashPassword(userBody.password);
    await userRepository.save(user);

    return user;
  }

  static async createSession(loginBody: Login): Promise<Payload> {
    const errors = Helper.validateData(loginBody, userLoginSchema);
    if (errors && errors.length > 0) {
      throw new GeneralError('Invalid body', Helper.getErrors(errors));
    }

    const userRepository = getRepository(User);
    const user =  await userRepository.findOne({email: loginBody.email});
    if (!user) {
      throw new GeneralError('Invalid email');
    }

    if (!user.comparePassword(loginBody.password)) {
      throw new GeneralError('Invalid password');
    }
    //TODO make it better
    const token = jwt.sign({id: user.id}, Constants.PRIVATE_KEY);
    
    return <Payload>{token, user};
  }

}
