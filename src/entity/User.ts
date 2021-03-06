import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import * as bcrypt from 'bcrypt';

import {Constants} from '../utils/constants';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    passwordHash: string

    // TODO como salvar apenas o yyyy-MM-dd
    @Column()
    birthDate: string;

    constructor(name: string, email: string, birthDate: string) {
      this.name = name;
      this.email = email;
      this.birthDate = birthDate;
    }

    hashPassword(password: string): string {
      const hashedPassword = bcrypt.hashSync(password, Constants.SALT);
      return hashedPassword;
    }

    comparePassword(password: string): boolean {
      return bcrypt.compareSync(password, this.passwordHash);
    }

}
