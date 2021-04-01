import { pool } from '../db/db';
import {Employee} from '../entity/Employee';

export class EmployeeRepository {
  static async findEmployeeByEmail(email: string): Promise<Employee> {
    return (await pool.query("select * from employee where email = $1", [email])).rows[0];
  }

  static async save(employee: Employee): Promise<Employee> {
    const obj = (await pool.query("INSERT INTO employee(name, email, password_hash, type) values($1, $2, $3, $4) RETURNING *",
                             [employee.name, employee.email, employee.password_hash, employee.type])).rows[0];
    employee.password_hash = obj["password_hash"];
    employee.id = obj["id"];

    return employee;
  }
}
