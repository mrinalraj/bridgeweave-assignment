import { Hotel } from "@prisma/client";

export class HotelResponse {
  public constructor(
    public id: number,
    public name: string,
    public description: string,
    public location: string,
    public address: string,
    public rating: number,
    public photos: string[],
    public rooms: any[] = [],
    public bookings: any[] = []
  ) {}

  public static from(hotel: Hotel, rooms: any[] = [], bookings: any[] = []) {
    return new HotelResponse(
      hotel.id,
      hotel.name,
      hotel.description,
      hotel.location,
      hotel.address,
      hotel.rating,
      hotel.photos,
      rooms,
      bookings
    );
  }
}
