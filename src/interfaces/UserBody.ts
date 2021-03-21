import {JobType} from '../entity/Employee';

export interface UserBody {
  name: string;
  email: string;
  type: JobType;
  password: string;
}
