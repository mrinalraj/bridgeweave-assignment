import { Request, Router } from "express";
import { HotelService } from "../service/HotelService";
import { ResponseBuilder } from "../utils/ResponseBuilder";
import { HotelRequestFilters } from "../dto/HotelRequestFilters";
import { asyncHandler } from "../utils/AsyncHandler";

export const HotelController = Router();

HotelController.route("/list").get(
  asyncHandler(async (req, res) => {
    const response = await HotelService.listHotels();

    return res.json(new ResponseBuilder().setData(response));
  })
);

HotelController.route("/search").get(
  asyncHandler(
    async (req: Request<any, any, any, HotelRequestFilters>, res) => {
      const response = await HotelService.searchHotel(req.query);

      return res.json(new ResponseBuilder().setData(response));
    }
  )
);

HotelController.route("/:id").get(
  asyncHandler(async (req, res) => {
    const response = await HotelService.getHotelById(parseInt(req.params.id));

    return res.json(new ResponseBuilder().setData(response));
  })
);

HotelController.route("/:id/availability").get(
  asyncHandler(async (req, res) => {
    const response = await HotelService.checkAvailability(
      parseInt(req.params.id),
      req.query.checkIn as string,
      req.query.checkOut as string
    );

    return res.json(new ResponseBuilder().setData(response));
  })
);
