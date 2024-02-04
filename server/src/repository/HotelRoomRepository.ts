import DBClient from "./DBClient";

const hotelRoom = DBClient.room;

export class HotelRoomRepository {
  public static findById(id: number) {
    return hotelRoom.findUnique({
      where: { id },
      include: { hotel: true },
    });
  }
}
