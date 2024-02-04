export interface Room {
  id: number;
  name: string;
  description: string;
  rent: number;
  photos: string[];
  hotelId: number;
  beds: number;
  guests: number;
  inclusions: string[];
}
