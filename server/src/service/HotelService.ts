import { HotelRepository } from "../repository/HotelRepository";
import { HotelResponse } from "../dto/HotelResponse";
import { HotelRequestFilters } from "../dto/HotelRequestFilters";
import { logger } from "../Logger";
import { BadRequest } from "../utils/Errors";
import { RoomRepository } from "../repository/RoomRepository";

export class HotelService {
  public static async listHotels() {
    return (await HotelRepository.findAll({ include: { rooms: true } })).map(
      (hotel) => {
        return HotelResponse.from(hotel, hotel.rooms);
      }
    );
  }

  public static async getHotelById(id: number) {
    const hotel = await HotelRepository.findById(id);

    if (hotel === null) {
      throw new BadRequest(`Hotel with id ${id} not found`);
    }

    return HotelResponse.from(hotel, hotel.rooms, hotel.bookings);
  }

  public static async searchHotel(filters: HotelRequestFilters) {
    const hotels = await HotelRepository.search(filters);

    return hotels.map((hotel) => {
      return HotelResponse.from(hotel, hotel.rooms, hotel.bookings);
    });
  }

  public static async checkAvailability(
    id: number,
    checkIn: string,
    checkOut: string
  ) {
    logger.info(`Checking availability for hotel id ${id}`);

    const hotel = await HotelRepository.findById(id);

    if (hotel === null) {
      throw new BadRequest(`Hotel with id ${id} not found`);
    }

    const rooms = await RoomRepository.getAvailableRoomsByHotelId(
      id,
      checkIn,
      checkOut
    );

    return HotelResponse.from(hotel, rooms);
  }
}
