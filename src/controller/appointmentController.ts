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

  async getActiveAppointment(_: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getActiveAppointment();
      return res.status(200).json(appointments);
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  // will return the next one selected and the last three
	async getNextAppointment(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const response = await AppointmentService.getNextAppointment(Number(id));
			return res.json(response);
		} catch(e) {
			return res.status(400).json(e);
		}
	}

  async getHistory(_: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getHistory();
      return res.json(appointments);
    } catch(e) {
      console.log(e);
    }
  }

  async removeAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AppointmentService.removeAppointment(Number(id));
      return res.status(204).json({});
    } catch(e) {
      console.log(e);
    }
  }


}
