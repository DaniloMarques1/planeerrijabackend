import * as bcrypt from 'bcrypt';
import {Constants} from '../utils/constants';

export enum JobType {
    VET = 'VET',
    REC = 'REC'
}


export class Employee {
    id: number;
    name: string;
    email: string;
    password_hash: string
    type: JobType

    constructor(name: string, email: string, type: JobType) {
      this.name = name;
      this.email = email;
      this.type = type;
    }

    static hashPassword(password: string): string {
      const hashedPassword = bcrypt.hashSync(password, Constants.SALT);
      return hashedPassword;
    }

    static comparePassword(password: string, hashedPassword: string): boolean {
      return bcrypt.compareSync(password, hashedPassword);
    }

}
