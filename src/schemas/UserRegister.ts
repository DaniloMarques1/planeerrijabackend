export const userRegisterSchema = {
  $id: 'userRegister',
  type: 'object',
  required: ['name', 'email', 'password', 'birthDate'],
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
    birthDate: {
      type: 'string',
      format: 'date'
    }
  }
}
