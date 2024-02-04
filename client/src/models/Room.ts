import { Hotel } from "./Hotel";

export interface Room {
  id: number;
  name: string;
  description: string;
  rent: number;
  photos: string[];
  hotelId: number;
  hotel?: Hotel;
  beds: number;
  guests: number;
  inclusions: string[];
}
