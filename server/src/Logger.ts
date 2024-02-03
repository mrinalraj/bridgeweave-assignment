import { transports, format, createLogger } from "winston";

export const logger = createLogger({
  format: format.json(),
  defaultMeta: { service: "hotel service" },
  transports: [new transports.Console()],
  exitOnError: false,
});

logger.exceptions.handle(
  new transports.Console({
    format: format.simple(),
  })
);
