import { RoomRepository } from "../../src/repository/RoomRepository";
import { HotelRoomService } from "../../src/service/HotelRoomService";
import { BadRequest } from "../../src/utils/Errors";
import { Room } from "../Entities";
import { hotel, room } from "../EntityFactory";

jest.mock("../../src/repository/RoomRepository");

describe("RoomService", () => {
  const mockedRoomRepository = jest.mocked(RoomRepository);

  test("findById", async () => {
    mockedRoomRepository.findById.mockResolvedValue({
      ...room,
      hotel: hotel,
      bookings: [],
    });

    const result = await HotelRoomService.findById(1);

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
  });

  test("findById throws when invalid id", async () => {
    mockedRoomRepository.findById.mockResolvedValue(null);

    const result = HotelRoomService.findById(1);

    await expect(result).rejects.toThrow(BadRequest);
  });
});
