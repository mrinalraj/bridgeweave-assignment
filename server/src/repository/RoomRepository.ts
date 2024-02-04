import DBClient from "./DBClient";

const room = DBClient.room;

export class RoomRepository {
  public static async getRoomsByHotelId(hotelId: number) {
    return await room.findMany({
      where: {
        hotelId: hotelId,
      },
    });
  }

  public static async getAvailableRoomsByHotelId(
    hotelId: number,
    checkIn: string,
    checkOut: string
  ) {
    return await room.findMany({
      where: {
        hotelId: hotelId,
        bookings: {
          none: {
            AND: [
              { checkIn: { lte: checkOut } },
              { checkOut: { gte: checkIn } },
            ],
          },
        },
      },
    });
  }
}
