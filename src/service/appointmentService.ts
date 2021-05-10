import {AppointmentRepository} from '../repository/appointmentRepository';
import {Appointment} from '../entity/Appointment';
import {GeneralError} from '../utils/generalError';
import {appointmentSchema} from '../schemas/Appointment';

import * as fs from 'fs';
import { Helper } from '../utils/helper';

export class AppointmentService {
  static async create(appointmentBody: Appointment, employeeId: number): Promise<Appointment> {
    const errors = Helper.validateData(appointmentBody, appointmentSchema);
    if (errors && errors.length > 0) {
      throw new GeneralError("Invalid body", Helper.getErrors(errors)); 
    }

    const appointment = await AppointmentRepository.save(appointmentBody, employeeId);
    return appointment;
  }

  static async getActiveAppointment(): Promise<Array<Appointment>> {
    const appointments = await AppointmentRepository.getActiveAppointment();
    return appointments;
  }

  static async getNextAppointment(appointmentId: number) {
    try {
      console.log("service...");
      let previous = JSON.parse(fs.readFileSync(".previous", "utf-8"));
      if (!previous) {
        previous = new Array<number>();
      }
      let nextAppointment = await AppointmentRepository.findById(appointmentId);
      if (!nextAppointment) {
        throw new GeneralError("Appointment not found"); 
      }

      const obj = {
        next: nextAppointment,
        previous: [...previous]
      }

      if (previous.length === 3) {
        previous.shift();
      }

      nextAppointment = await AppointmentRepository.inactiveAppoitment(nextAppointment.id);
      previous.unshift(nextAppointment);
      fs.writeFileSync(".previous", JSON.stringify(previous), {encoding: "utf-8", flag: "w"});

      return obj;
    } catch(e) {
      throw e;
    }
  }

  static async getHistory() {
    return await AppointmentRepository.getHistory();
  }

  static async removeAppointment(id: number) {
    return await AppointmentRepository.removeAppointment(id);
  }
}
