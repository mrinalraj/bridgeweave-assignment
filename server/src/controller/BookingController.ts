import { Router, Request } from "express";
import { BookingRequest } from "../dto/BookingRequest";
import { BookingService } from "../service/BookingService";
import { ResponseBuilder } from "../utils/ResponseBuilder";
import { GetBookingParams } from "../dto/GetBookingParams";
import { asyncHandler } from "../utils/AsyncHandler";

export const BookingController = Router();

BookingController.route("/").get(
  asyncHandler(async (req: Request<any, any, any, GetBookingParams>, res) => {
    const bookings = await BookingService.listBookings(req.query.deviceId);
    return res.json(new ResponseBuilder().setData(bookings));
  })
);

BookingController.route("/").post(
  asyncHandler(async (req: Request<any, any, BookingRequest, any>, res) => {
    const response = await BookingService.createBooking(req.body);

    return res.json(new ResponseBuilder().setData(response));
  })
);

BookingController.route("/:id").delete(
  asyncHandler(async (req: Request<{ id: string }, any, any, any>, res) => {
    const response = await BookingService.cancelBooking(
      parseInt(req.params.id)
    );

    return res.json(new ResponseBuilder().setData(response));
  })
);
