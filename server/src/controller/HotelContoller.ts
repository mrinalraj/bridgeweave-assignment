import { Router } from "express";

export const HotelController = Router();

HotelController.route("/list").get();
HotelController.route("/:id").get();
HotelController.route("/search").get();
