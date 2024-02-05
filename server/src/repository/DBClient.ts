import { PrismaClient } from "@prisma/client";
import { logger } from "../Logger";

const DBClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

DBClient.$on("query", (e) => {
  logger.info(`Query: ${e.query} ${e.params}`);
});

export default DBClient;
