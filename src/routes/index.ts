import {Router} from 'express';
import { employeeRouter } from './employee';
import { appointmentRouter } from './appointment';

const routes = Router();

routes.use(employeeRouter);

routes.use(appointmentRouter);

export { routes };
