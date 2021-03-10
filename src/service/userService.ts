import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserBody } from '../interfaces/UserBody';
import {Helper} from '../utils/helper';
import { GeneralError } from '../utils/generalError';
import {userRegisterSchema} from '../schemas/UserRegister';

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
}
