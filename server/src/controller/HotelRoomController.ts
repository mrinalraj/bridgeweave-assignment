import { Router, Request } from "express";
import { ResponseBuilder } from "../utils/ResponseBuilder";
import { HotelRoomService } from "../service/HotelRoomService";
import { asyncHandler } from "../utils/AsyncHandler";

export const HotelRoomController = Router();

HotelRoomController.route("/:id").get(
  asyncHandler(async (req: Request<{ id: string }, any, any, any>, res) => {
    const response = await HotelRoomService.findById(parseInt(req.params.id));

    return res.json(new ResponseBuilder().setData(response));
  })
);
