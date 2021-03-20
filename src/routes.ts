import { Router } from 'express';
import {EmployeeController} from './controller/employeeController';

const routes = Router();

const employeeController = new EmployeeController();

routes.post('/employee', employeeController.addEmployee);
routes.post('/session', employeeController.createSession);

export { routes };
