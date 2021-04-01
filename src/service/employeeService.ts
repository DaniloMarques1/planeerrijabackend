import { Employee, JobType } from '../entity/Employee';
import { UserBody } from '../interfaces/UserBody';
import { Helper } from '../utils/helper';
import { GeneralError } from '../utils/generalError';
import { employeeRegistrationSchema } from '../schemas/EmployeeRegister';
import { userLoginSchema } from '../schemas/EmployeeLogin';
import { Login } from '../interfaces/Login';
import * as jwt from 'jsonwebtoken';
import {Constants} from '../utils/constants';
import {Payload} from '../interfaces/Payload';
import {EmployeeRepository} from '../repository/employeeRepository';

export class EmployeeService {

  static async addEmployee(userBody: UserBody): Promise<Employee> {
    const errors = Helper.validateData(userBody, employeeRegistrationSchema);
    if (errors && errors .length > 0) {
      throw new GeneralError('Invalid body', Helper.getErrors(errors));
    }

    const employeeExist =  await EmployeeRepository.findEmployeeByEmail(userBody.email);
    if (employeeExist) {
      throw new GeneralError('Email already used');
    }

    const employee = new Employee(userBody.name, userBody.email, JobType[userBody.type]);
    employee.password_hash = Employee.hashPassword(userBody.password);
    return await EmployeeRepository.save(employee);
  }

  static async createSession(loginBody: Login): Promise<Payload> {
    const errors = Helper.validateData(loginBody, userLoginSchema);
    if (errors && errors.length > 0) {
      throw new GeneralError('Invalid body', Helper.getErrors(errors));
    }

    const employee =  await EmployeeRepository.findEmployeeByEmail(loginBody.email);
    if (!employee) {
      throw new GeneralError('Invalid email');
    }

    if (!Employee.comparePassword(loginBody.password, employee.password_hash)) {
      throw new GeneralError('Invalid password');
    }

    const token = jwt.sign({id: employee.id}, Constants.PRIVATE_KEY);
    return <Payload>{token, employee};
  }

}
