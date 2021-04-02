import {Request, Response} from 'express';

import {AppointmentService} from '../service/appointmentService';

export class AppointmentController {
  async createAppointment(req: Request, res: Response) {
    try {
      const employeeId = <string>req.headers["id"];
      const appointment = await AppointmentService.create(req.body, Number(employeeId));
      return res.status(201).json(appointment);
    } catch(e) {
      console.log(e);
      // TODO
      return res.status(400).json(e);
    }
  }

  async getActiveAppointment(req: Request, res: Response) {
    try {
      const employeeId = <string>req.headers["id"];
      const appointments = await AppointmentService.getActiveAppointment(Number(employeeId));
      return res.status(200).json(appointments);
    } catch(e) {
      return res.status(400).json(e);
    }
  }
}
