export class GeneralError {
  message: string;
  errors?: Array<string>;

  constructor(message: string, errors?: Array<string>) {
    this.message = message;
    this.errors = errors;
  }
}
