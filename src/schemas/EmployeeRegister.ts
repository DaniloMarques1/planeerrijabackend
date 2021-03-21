import {JobType} from '../entity/Employee';

export const employeeRegistrationSchema = {
  $id: 'employeeRegistrationSchema',
  type: 'object',
  required: ['name', 'email', 'password', 'type'],
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 6
    },
    type: {
      type: 'string',
      enum: [JobType.VET, JobType.REC]
    }
  }
}
