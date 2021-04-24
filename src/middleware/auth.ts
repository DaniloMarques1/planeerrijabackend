import {Request, Response, NextFunction} from 'express';
import {GeneralError} from '../utils/generalError';
import {Helper} from '../utils/helper';

import {EmployeeRepository} from '../repository/employeeRepository';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const auth = <string>req.headers["authorization"]
		if (!auth)
			return res.status(401).json(new GeneralError("Missing token"));
		const token = auth.split(" ")[1];
		const employeeId = Helper.getPayload(token);

		const employee = await EmployeeRepository.findEmployeeById(Number(employeeId));
		if (!employee) {
			return res.status(401).json(new GeneralError("Invalid token"));
		}

		req.headers["id"] = employeeId;

		return next();
	}catch(e) {
		return res.status(401).json(new GeneralError("Invalid token"));
	}
}
