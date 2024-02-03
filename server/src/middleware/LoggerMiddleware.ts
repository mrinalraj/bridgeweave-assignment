import { HandlerFn } from "../utils/AsyncHandler";
import { logger } from "../Logger";
import { v4 as uuidv4 } from "uuid";

export const loggerMiddleware: HandlerFn = (req, res, next) => {
  const requestId = uuidv4();
  logger.profile(requestId);
  logger.info(`entering controller, request id:  ${requestId}`);
  res.on("finish", () => {
    logger.profile(requestId, {
      level: "info",
      message: "time took",
    });
    logger.info(`exiting controller, request id:  ${requestId}`);
  });
  next();
};
