import {AppointmentRepository} from '../repository/appointmentRepository';
import {Appointment} from '../entity/Appointment';
import {EmployeeRepository} from '../repository/employeeRepository';
import {GeneralError} from '../utils/generalError';
import {Helper} from '../utils/helper';
import {appointmentSchema} from '../schemas/Appointment';

export class AppointmentService {
  static async create(appointmentBody: Appointment, employeeId: number): Promise<Appointment> {
    const errors = Helper.validateData(appointmentBody, appointmentSchema);
    if (errors && errors.length > 0) {
      throw new GeneralError("Invalid body", Helper.getErrors(errors)); 
    }
    const employee = await EmployeeRepository.findEmployeeById(employeeId);
    if (!employee) {
      throw new GeneralError("Invalid token"); 
    }

    const appointment = await AppointmentRepository.save(appointmentBody, employeeId);
    return appointment;
  }

  static async getActiveAppointment(employeeId: number): Promise<Array<Appointment>> {
    const employee = await EmployeeRepository.findEmployeeById(employeeId);
    if (!employee) {
      throw new GeneralError("Invalid token"); 
    }
    const appointments = await AppointmentRepository.getActiveAppointment();

    return appointments;
  }
}
