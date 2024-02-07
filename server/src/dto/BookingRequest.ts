import moment from "moment";
import { Booking } from "./Entities";
import { UserRequest } from "./UserRequest";

export interface BookingRequest extends UserRequest {
  roomId: number;
  checkIn: Date;
  checkOut: Date;
}

export const bookingRequestToEntity = (
  request: BookingRequest,
  hotelId: number
) => {
  return {
    hotelId: hotelId,
    name: request.name,
    email: request.email,
    phone: request.phone,
    deviceId: request.deviceId,
    roomId: request.roomId,
    checkIn: moment(request.checkIn).toDate(),
    checkOut: moment(request.checkOut).toDate(),
    cancelled: false,
  };
};
