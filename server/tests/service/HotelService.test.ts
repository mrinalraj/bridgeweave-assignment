import { response } from "express";
import { HotelRepository } from "../../src/repository/HotelRepository";
import { HotelService } from "../../src/service/HotelService";

jest.mock("../../src/repository/HotelRepository");

const hotel = {
  id: 1,
  name: "Test",
  description: "Test",
  address: "Test",
  location: "Test, Test",
  rating: "Test",
  photos: ["Test"],
  rooms: [],
  bookings: [],
};

describe("HotelService", () => {
  const mockedRepository = jest.mocked(HotelRepository);

  test("findById", async () => {
    const result = await HotelService.getHotelById(1);
    expect(result).not.toBeNull();
  });
});
