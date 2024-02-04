import DBClient from "./DBClient";

const hotel = DBClient.booking;

export class BookingRepository {
  public static findByUserId(userId: number) {
    return hotel.findMany({
      where: { userId },
      include: { room: true, hotel: true },
    });
  }

  public static save = hotel.create;
}
