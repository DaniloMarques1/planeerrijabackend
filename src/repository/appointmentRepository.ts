import {pool} from '../db/db';
import {Appointment} from '../entity/Appointment';

export class AppointmentRepository {
  static async save(appointment: Appointment) {
    return (await pool.query("insert into appointment(owner_name, pet_name, pet_type, description) values ($1, $2, $3, $4) returning *", 
                            [appointment.owner_name, appointment.pet_name, appointment.pet_type, appointment.description])).rows[0];
  }

}
