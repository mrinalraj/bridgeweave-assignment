import { Express } from "express";
import { HotelController } from "./HotelContoller";
import { BookingController } from "./BookingController";

export const controllers = (app: Express) => {
  app.use("/hotels", HotelController);
  app.use("/bookings", BookingController);
};
