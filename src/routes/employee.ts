import { Router } from 'express';

import {EmployeeController} from "../controller/employeeController";

const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.post('/employee', employeeController.addEmployee);
employeeRouter.post('/session', employeeController.createSession);

export { employeeRouter };
