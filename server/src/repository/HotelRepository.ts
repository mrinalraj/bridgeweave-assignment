import { HotelRequestFilters } from "../dto/HotelRequestFilters";
import DBClient from "./DBClient";

const hotel = DBClient.hotel;

export class HotelRepository {
  public static findAll = hotel.findMany;
  public static async findById(id: number) {
    return hotel.findUnique({
      where: { id },
      include: { rooms: true, bookings: true },
    });
  }

  public static async search(filters: HotelRequestFilters) {
    const where: { AND: any } = { AND: [] };

    if (filters.address) {
      where.AND.push({
        address: { contains: filters.address, mode: "insensitive" },
      });
    }

    if (filters.minRent || filters.maxRent) {
      where.AND.push({
        rooms: {
          some: {
            rent: {
              gte: filters.minRent ? parseFloat(filters.minRent) : 0,
              lte: filters.maxRent ? parseFloat(filters.maxRent) : 100000,
            },
          },
        },
      });
    }

    if (filters.minRating || filters.maxRating) {
      where.AND.push({
        rating: {
          gte: filters.minRating ? parseFloat(filters.minRating) : 0,
          lte: filters.maxRating ? parseFloat(filters.maxRating) : 5,
        },
      });
    }

    return await hotel.findMany({
      where,
      include: { rooms: true, bookings: true },
    });
  }
}
