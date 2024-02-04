import { BookingRequest } from "../dto/BookingRequest";
import { UserService } from "./UserService";
import { HotelRoomService } from "./HotelRoomService";
import { BookingRepository } from "../repository/BookingRepository";
import moment from "moment";

export class BookingService {
  public static async createBooking(request: BookingRequest) {
    const user = await UserService.findByDeviceId(request.deviceId);
    const hotelRoom = await HotelRoomService.findById(request.roomId);

    const booking = await BookingRepository.save({
      data: {
        userId: user.id,
        roomId: request.roomId,
        hotelId: hotelRoom.hotelId,
        checkIn: moment(request.checkIn).toDate(),
        checkOut: moment(request.checkOut).toDate(),
        cancelled: false,
      },
    });
    return booking;
  }

  public static async listBookings(deviceId: string) {
    const user = await UserService.findByDeviceId(deviceId);

    return await BookingRepository.findByUserId(user.id);
  }
}
