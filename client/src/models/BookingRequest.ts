import { UserRequest } from "./UserRequest";

export interface BookingRequest extends UserRequest {
  roomId: number;
  checkIn: string;
  checkOut: string;
}
