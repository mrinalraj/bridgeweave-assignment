import { RoomRepository } from "../repository/RoomRepository";
import { BadRequest } from "../utils/Errors";

export class HotelRoomService {
  public static async findById(id: number) {
    const hotelRoom = await RoomRepository.findById(id);

    if (!hotelRoom) throw new BadRequest("Hotel room not found");

    return hotelRoom;
  }
}
