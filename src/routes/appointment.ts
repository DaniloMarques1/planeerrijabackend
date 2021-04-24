import {Router} from 'express';
import {AppointmentController} from '../controller/appointmentController';
import {authMiddleware} from '../middleware/auth';

const appointmentRouter = Router();

const appointmentController = new AppointmentController();

appointmentRouter.use(authMiddleware);

appointmentRouter.post('/appointment', appointmentController.createAppointment);
appointmentRouter.get('/appointment', appointmentController.getActiveAppointment);

appointmentRouter.get('/appointment/next/:id', appointmentController.getNextAppointment);

export {appointmentRouter}
