export default class HttpError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
