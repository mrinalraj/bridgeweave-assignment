import { ErrorRequestHandler } from "express";
import { GeneralError } from "../utils/Errors";
import { StatusCodes } from "http-status-codes";
import { ResponseBuilder } from "../utils/ResponseBuilder";

const response = new ResponseBuilder().setError();

export const ErrorMiddleware: ErrorRequestHandler = (
  error: GeneralError,
  req,
  res,
  next
) => {
  if (error) {
    if (error instanceof GeneralError) {
      const { statusCode, message } = error;
      return res
        .status(statusCode)
        .json(response.setStatus(statusCode).setMessage(message));
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(response.setStatus(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  } else {
    next();
  }
};
