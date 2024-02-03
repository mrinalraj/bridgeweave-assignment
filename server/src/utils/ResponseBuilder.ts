import { getReasonPhrase, StatusCodes } from "http-status-codes";
export class ResponseBuilder<T> {
  constructor(statusCode?: StatusCodes) {
    if (statusCode) this.statusCode = statusCode;
  }

  private error: boolean = false;
  private success: boolean = true;
  private message: string = getReasonPhrase(StatusCodes.OK);
  private statusCode: StatusCodes = StatusCodes.OK;
  private data: T | null = null;

  public setStatus = (statusCode: StatusCodes) => {
    this.statusCode = statusCode;
    this.message = getReasonPhrase(statusCode);
    return this;
  };

  public setMessage = (message: string) => {
    this.message = message;
    return this;
  };

  public setError = () => {
    this.error = true;
    this.success = false;
    return this;
  };

  public setSuccess = () => {
    this.error = false;
    this.success = true;
    return this;
  };

  public setData = (data: T | null) => {
    this.data = data;
    return this;
  };

  public get responseObject() {
    const { error, message, statusCode, success, data } = this;
    return {
      error,
      message,
      statusCode,
      success,
      data,
    };
  }
}
