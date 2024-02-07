import request from "supertest";
import { app } from "../../src/app";
import { HotelRoomService } from "../../src/service/HotelRoomService";
import { hotel, room } from "../EntityFactory";
import { BadRequest } from "../../src/utils/Errors";

jest.mock("../../src/service/HotelRoomService");

describe("RoomController", () => {
  const mockedService = jest.mocked(HotelRoomService);

  test("listRooms", async () => {
    mockedService.findById.mockResolvedValue({ ...room, hotel, bookings: [] });
    await request(app)
      .get("/rooms/40")
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });
    expect(mockedService.findById).toHaveBeenCalledWith(40);
  });

  test("listRooms - not found, general error", async () => {
    mockedService.findById.mockImplementation(() => {
      throw new Error("Room not found");
    });

    await request(app).get(`/rooms/1`).expect(500);
  });

  test("listRooms - not found", async () => {
    mockedService.findById.mockImplementation(() => {
      throw new BadRequest("Hotel room not found");
    });

    await request(app).get(`/rooms/1`).expect(400);
  });
});
