import { Room } from "./Room";

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  rating: number;
  photos: string[];
  rooms: Room[];
  bookings: any[];
}
