import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import * as bcrypt from 'bcrypt';

import {Constants} from '../utils/constants';

export enum JobType {
    VET = 'VET',
    REC = 'REC'
}

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    passwordHash: string

    @Column()
    type: JobType

    constructor(name: string, email: string, type: JobType) {
      this.name = name;
      this.email = email;
      this.type = type;
    }

    hashPassword(password: string): string {
      const hashedPassword = bcrypt.hashSync(password, Constants.SALT);
      return hashedPassword;
    }

    comparePassword(password: string): boolean {
      return bcrypt.compareSync(password, this.passwordHash);
    }

}
