class RequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestError";
  }
}

export class AuthorisationError extends RequestError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "AuthorisationError";
    this.statusCode = 401;
  }
}

export default RequestError;
