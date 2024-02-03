import DBClient from "./DBClient";

const hotel = DBClient.hotel;

export class HotelRepository {
  public static findAll = hotel.findMany;
  public static async findById(id: number) {
    return await hotel.findUnique({ where: { id } });
  }
}
