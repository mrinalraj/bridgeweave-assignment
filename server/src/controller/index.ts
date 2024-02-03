import { Express } from "express";
// import { AuthenticationMiddleware } from "../middlewares/AuthentcationMiddleware";
import { HotelController } from "./HotelContoller";

export const controllers = (app: Express) => {
  app.use("/hotel", HotelController);
};
