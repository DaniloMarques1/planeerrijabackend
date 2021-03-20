import { Employee } from '../entity/Employee';

export interface Payload {
  token: string;
  employee: Employee;
}
