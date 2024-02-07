import { BookingRequest, bookingRequestToEntity } from "../dto/BookingRequest";
import { HotelRoomService } from "./HotelRoomService";
import { BookingRepository } from "../repository/BookingRepository";

export class BookingService {
  public static async createBooking(request: BookingRequest) {
    const hotelRoom = await HotelRoomService.findById(request.roomId);

    const booking = await BookingRepository.save({
      data: bookingRequestToEntity(request, hotelRoom.hotelId),
    });
    return booking;
  }

  public static async listBookings(deviceId: string) {
    return await BookingRepository.findByDeviceId(deviceId);
  }

  public static async cancelBooking(bookingId: number) {
    return await BookingRepository.cancelBooking(bookingId);
  }
}
