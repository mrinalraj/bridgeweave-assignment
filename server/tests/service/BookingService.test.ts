import { HotelRoomService } from "../../src/service/HotelRoomService";
import { BookingRepository } from "../../src/repository/BookingRepository";
import { BookingService } from "../../src/service/BookingService";
import { booking, hotel, room } from "../EntityFactory";

jest.mock("../../src/repository/BookingRepository");
jest.mock("../../src/service/HotelRoomService");

describe("BookingService", () => {
  const mockedRepository = jest.mocked(BookingRepository);
  const mockedHotelRoomService = jest.mocked(HotelRoomService);

  test("createBooking", async () => {
    mockedHotelRoomService.findById.mockResolvedValue({
      ...room,
      hotel,
      bookings: [],
    });

    mockedRepository.save.mockResolvedValueOnce({
      id: 1,
      hotelId: hotel.id,
      roomId: room.id,
      checkIn: new Date(),
      checkOut: new Date(),
      deviceId: "123",
      name: "Test",
      email: "",
      phone: "",
      cancelled: false,
    });

    const result = await BookingService.createBooking({
      roomId: 1,
      checkIn: new Date(),
      checkOut: new Date(),
      deviceId: "123",
      name: "Test",
      email: "",
      phone: "",
    });

    expect(result).not.toBeNull();
    expect(result.hotelId).toBe(hotel.id);
  });

  test("cancelBooking", async () => {
    mockedRepository.cancelBooking.mockResolvedValueOnce({
      id: 1,
      hotelId: 1,
      roomId: 1,
      name: "Test",
      email: "",
      phone: "",
      deviceId: "123",
      checkIn: new Date(),
      checkOut: new Date(),
      cancelled: true,
    });

    const result = await BookingService.cancelBooking(1);

    expect(result.cancelled).toBe(true);
  });

  test("listBookings", async () => {
    mockedRepository.findByDeviceId.mockResolvedValueOnce([
      {
        ...booking,
        hotel,
        room,
      },
    ]);

    const result = await BookingService.listBookings("123");

    expect(result).not.toBeNull();
    expect(result[0].hotelId).toBe(hotel.id);
  });
});
