import {Request, Response} from 'express';

import {AppointmentService} from '../service/appointmentService';

export class AppointmentController {
  async createAppointment(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.create(req.body);
      return res.status(201).json(appointment);
    } catch(e) {
      // TODO
      return res.status(400).json(e);
    }
  }
}
