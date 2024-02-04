import { Hotel } from "./Hotel";
import { Room } from "./Room";

export interface Booking {
  id: number;
  hotelId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  cancelled: boolean;
  room: Room;
  hotel: Hotel;
}
