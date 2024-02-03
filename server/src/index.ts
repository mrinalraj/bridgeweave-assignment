import express, { Express, Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { PrismaClient } from "@prisma/client";
import { NotFound } from "./utils/Errors";
import { controllers } from "./controller";
import { logger } from "./Logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(json());

app.use(morgan("common"));

controllers(app);

app.use("*", () => {
  throw new NotFound("Not Found");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const server = app.listen(port, () => {
  console.log(
    `🚀 Server is running on port ${port} in ${process.env.NODE_ENV}`
  );

  new PrismaClient().$executeRaw`select * from Hotel`.catch(() => {
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
