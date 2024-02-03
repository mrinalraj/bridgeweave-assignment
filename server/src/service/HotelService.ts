import { Hotel } from "@prisma/client";
import { HotelRepository } from "../repository/HotelRepository";
import { asyncHandler } from "../utils/AsyncHandler";
import { HotelResponse } from "../dto/HotelResponse";

export class HotelService {
  public static async listHotels() {
    return (await HotelRepository.findAll()).map((hotel) => {
      return HotelResponse.from(hotel);
    });
  }
}
