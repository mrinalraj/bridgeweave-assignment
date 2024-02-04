// import { HandlerFn } from "../@types/app";
import { logger } from "../Logger";
import { Request, Response, NextFunction } from "express";

export type HandlerFn<ReqBody = any, ReqQuery = any> = (
  req: Request<any, any, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction
) => void;

export const asyncHandler = (handler: HandlerFn): HandlerFn => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      logger.error(`${error.message} :: ${error.stack}`);
      next(error);
    }
  };
};
