import { PrismaClient } from "@prisma/client";
import { logger } from "./src/Logger";
import { app } from "./src/app";

const port = process.env.PORT || 8001;

export const server = app.listen(port, () => {
  console.log(
    `🚀 Server is running on port ${port} in ${process.env.NODE_ENV}`
  );

  new PrismaClient().$executeRaw`select 1`.catch(() => {
    logger.error("Database Connection Error");
    onClose();
  });
});

const onClose = () => {
  logger.error("Gracefully shutting down......");
  new PrismaClient().$disconnect();
  server.close().removeAllListeners();
  process.exit(1);
};

process.on("SIGINT", onClose);
