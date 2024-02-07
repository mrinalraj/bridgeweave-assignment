import express, { Express, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { NotFound } from "./utils/Errors";
import { controllers } from "./controller";

import { ErrorMiddleware } from "./middleware/ErrorMiddleware";

dotenv.config();

export const app: Express = express();

app.use(cors());
app.use(json());

app.use(morgan("common"));

controllers(app);

app.use("*", () => {
  throw new NotFound("Not Found");
});

app.use(ErrorMiddleware);
