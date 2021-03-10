import Ajv, {ErrorObject, Schema} from "ajv";
import addFormats from 'ajv-formats';

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
}
