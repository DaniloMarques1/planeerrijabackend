import { Router } from 'express';
import {EmployeeController} from './controller/employeeController';
import {AppointmentController} from './controller/appointmentController';

const routes = Router();

const employeeController = new EmployeeController();
const appointmentController = new AppointmentController();

routes.post('/employee', employeeController.addEmployee);
routes.post('/session', employeeController.createSession);

routes.post('/appointment', appointmentController.createAppointment);

export { routes };
