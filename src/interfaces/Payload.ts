import { User } from '../entity/User';

export interface Payload {
  token: string;
  user: User;
}
