import { Express } from "express";
import { HotelController } from "./HotelContoller";
import { BookingController } from "./BookingController";
import { HotelRoomController } from "./HotelRoomController";
import { UserController } from "./UserController";

export const controllers = (app: Express) => {
  app.use("/hotels", HotelController);
  app.use("/bookings", BookingController);
  app.use("/rooms", HotelRoomController);
  app.use("/users", UserController);
};
