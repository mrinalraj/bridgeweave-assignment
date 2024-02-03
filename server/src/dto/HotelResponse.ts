import { Hotel } from "@prisma/client";

export class HotelResponse {
  public constructor(
    public id: number,
    public name: string,
    public description: string,
    public location: string,
    public address: string,
    public rating: number,
    public rent: number,
    public photos: string[],
    public inclusions: string[]
  ) {}

  public static from(hotel: Hotel) {
    return new HotelResponse(
      hotel.id,
      hotel.name,
      hotel.description,
      hotel.location,
      hotel.address,
      hotel.rating,
      hotel.rent,
      hotel.photos,
      hotel.inclusions
    );
  }
}
