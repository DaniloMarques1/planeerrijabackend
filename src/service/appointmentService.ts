import {AppointmentRepository} from '../repository/appointmentRepository';
import {Appointment} from '../entity/Appointment';

export class AppointmentService {
  static async create(appointmentBody: Appointment): Promise<Appointment> {
    // TODO associar o atendente a consulta agendada
    const appointment = await AppointmentRepository.save(appointmentBody);
    return appointment;
  }
}
