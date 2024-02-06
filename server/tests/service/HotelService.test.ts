import { HotelRepository } from "../../src/repository/HotelRepository";
import { RoomRepository } from "../../src/repository/RoomRepository";
import { HotelService } from "../../src/service/HotelService";
import { BadRequest } from "../../src/utils/Errors";
import { Room } from "../Entities";

jest.mock("../../src/repository/HotelRepository");
jest.mock("../../src/repository/RoomRepository");

const hotel = {
  id: 1,
  name: "Test",
  description: "Test",
  address: "Test",
  location: "Test, Test",
  rating: 4,
  photos: ["Test"],
  rooms: [],
  bookings: [],
};

describe("HotelService", () => {
  const mockedRepository = jest.mocked(HotelRepository);
  const mockedRoomRepository = jest.mocked(RoomRepository);

  test("listHotels", async () => {
    mockedRepository.findAll.mockResolvedValue([hotel]);

    const result = await HotelService.listHotels();

    expect(result).not.toBeNull();
    expect(result.length).toBe(1);
  });

  test("listHotels empty", async () => {
    mockedRepository.findAll.mockResolvedValue([]);

    const result = await HotelService.listHotels();

    expect(result).not.toBeNull();
    expect(result.length).toBe(0);
  });

  test("getHotelById", async () => {
    mockedRepository.findById.mockResolvedValue(hotel);

    const result = await HotelService.getHotelById(1);

    expect(result).not.toBeNull();
    expect(result.id).toBe(1);
  });

  test("getHotelById null throws", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    const call = HotelService.getHotelById(1);
    await expect(call).rejects.toThrow(BadRequest);
  });

  test("searchHotel", async () => {
    mockedRepository.search.mockResolvedValue([hotel]);

    const result = await HotelService.searchHotel({});

    expect(result).not.toBeNull();
  });

  test("checkAvailability", async () => {
    mockedRepository.findById.mockResolvedValue(hotel);
    const room: Room = {
      id: 1,
      hotelId: 1,
      name: "Test",
      rent: 100,
      guests: 2,
      beds: 1,
      photos: ["Test"],
      inclusions: ["Test"],
    };
    mockedRoomRepository.getAvailableRoomsByHotelId.mockResolvedValue([room]);

    const result = await HotelService.checkAvailability(
      1,
      "2021-01-01",
      "2021-01-02"
    );

    expect(result).not.toBeNull();
  });

  test("checkAvailability throws error when incorrect hotel id", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    const result = HotelService.checkAvailability(
      1,
      "2021-01-01",
      "2021-01-02"
    );

    await expect(result).rejects.toThrow(BadRequest);
  });
});
