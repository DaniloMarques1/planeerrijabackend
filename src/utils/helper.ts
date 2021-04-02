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

  static getPayload(token: string): string {
    const payload = jwt.verify(token, Constants.PRIVATE_KEY);
    const employeeId = payload["id"];
    return employeeId;
  }
}
