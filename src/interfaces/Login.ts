import {User} from "../entity/User";

export interface Login {
  token: string;
  user: User;
}
