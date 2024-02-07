import DBClient from "./DBClient";

const hotel = DBClient.booking;

export class BookingRepository {
  public static findByDeviceId(deviceId: string) {
    return hotel.findMany({
      where: { deviceId },
      include: { room: true, hotel: true },
    });
  }

  public static save = hotel.create;

  public static cancelBooking(bookingId: number) {
    return hotel.update({
      where: { id: bookingId },
      data: { cancelled: true },
    });
  }
}
