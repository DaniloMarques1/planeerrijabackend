import { Request, Response } from 'express';
import { EmployeeService } from '../service/employeeService';
import { GeneralError } from '../utils/generalError';

export class EmployeeController {
  async addEmployee(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body);

      const employee = await EmployeeService.addEmployee(req.body);
      return res.status(201).json({employee});

    } catch(e) {
      if (e instanceof GeneralError) {
        return res.status(400).json(e);
      }

      return res.status(400).json({message: 'Unexpected error'});
    }
  }

  async createSession(req: Request, res: Response): Promise<Response> {
    try {
      const payload = await EmployeeService.createSession(req.body);
      return res.json(payload);
    } catch(e) {
      // TODO
      return res.status(400).json({});
    }
  }

}
