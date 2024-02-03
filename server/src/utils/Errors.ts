import { StatusCodes } from "http-status-codes";

export class GeneralError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";

    Object.setPrototypeOf(this, GeneralError.prototype);
  }

  get statusCode() {
    if (this instanceof BadRequest) return StatusCodes.BAD_REQUEST;
    if (this instanceof NotFound) return StatusCodes.NOT_FOUND;
    if (this instanceof Unauthorised) return StatusCodes.UNAUTHORIZED;
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}
export class NotFound extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
export class Unauthorised extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "Unauthorised";
    Object.setPrototypeOf(this, Unauthorised.prototype);
  }
}
