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

  static async getNextAppointment(ids: Array<number>): Promise<Array<Appointment>> {
    return (await pool.query("select * from appointment where id = $1 or id = $2 or id = $3",
                             [...ids])).rows;
  }

  static async findById(id: number): Promise<Appointment> {
    return (await pool.query("select * from appointment where id = $1", [id])).rows[0];
  }

  static async inactiveAppoitment(id: number): Promise<Appointment> {
    return (await pool.query("update appointment set active = false where id = $1 returning *", [id])).rows[0];
  }
}
