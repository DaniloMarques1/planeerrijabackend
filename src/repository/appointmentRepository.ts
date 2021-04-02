import {pool} from '../db/db';
import {Appointment} from '../entity/Appointment';

export class AppointmentRepository {
  static async save(appointment: Appointment, employee_id: number) {
    return (await pool.query(
      "insert into appointment(owner_name, pet_name, pet_type, description, employee_id) values ($1, $2, $3, $4, $5) returning *", 
      [appointment.owner_name, appointment.pet_name, appointment.pet_type, appointment.description, employee_id])).rows[0];
  }

  static async getActiveAppointment(): Promise<Array<Appointment>> {
    return (await pool.query("select * from appointment where active = true")).rows;
  }
}
