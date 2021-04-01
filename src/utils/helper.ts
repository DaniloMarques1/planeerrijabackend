import Ajv, {ErrorObject, Schema} from "ajv";
import addFormats from 'ajv-formats';
import * as jwt from 'jsonwebtoken';
import {Constants} from './constants';

export class Helper {
  static validateData(data: object, schema: Schema ): Array<ErrorObject> {
    const ajv = new Ajv();
    addFormats(ajv);

    const validate = ajv.compile(schema);
    validate(data);

    return validate.errors;
  }

  static getErrors(errors: Array<ErrorObject>): Array<string> {
    return errors.map(error => {
      return error.dataPath;
    });
  }

  static async getPayload(token: string): Promise<number> {
    const employeeId = await jwt.verify(token, Constants.PRIVATE_KEY);
    return Number(employeeId);
  }
}
