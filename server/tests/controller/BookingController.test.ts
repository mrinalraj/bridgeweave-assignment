import request from "supertest";
import { app } from "../../src/app";
import { BookingService } from "../../src/service/BookingService";
import { booking, hotel, room } from "../EntityFactory";

jest.mock("../../src/service/BookingService");

describe("BookingController", () => {
  const mockedService = jest.mocked(BookingService);

  test("createBooking", async () => {
    mockedService.createBooking.mockResolvedValue({
      id: 1,
      hotelId: 1,
      roomId: 1,
      checkIn: new Date(),
      checkOut: new Date(),
      deviceId: "123",
      name: "Test",
      email: "",
      phone: "",
      cancelled: false,
    });

    await request(app)
      .post("/bookings")
      .send({
        roomId: 1,
        checkIn: new Date(),
        checkOut: new Date(),
        deviceId: "123",
        name: "Test",
        email: "",
        phone: "",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });

    expect(mockedService.createBooking).toHaveBeenLastCalledWith({
      roomId: 1,
      checkIn: expect.any(String),
      checkOut: expect.any(String),
      deviceId: "123",
      name: "Test",
      email: "",
      phone: "",
    });
  });

  test("cancelBooking", async () => {
    mockedService.cancelBooking.mockResolvedValue({
      id: 1,
      hotelId: 1,
      roomId: 1,
      checkIn: new Date(),
      checkOut: new Date(),
      deviceId: "123",
      name: "Test",
      email: "",
      phone: "",
      cancelled: true,
    });

    await request(app)
      .delete("/bookings/1")
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });

    expect(mockedService.cancelBooking).toHaveBeenLastCalledWith(1);
  });

  test("getBookingByDeviceId", async () => {
    mockedService.listBookings.mockResolvedValue([{ ...booking, hotel, room }]);

    await request(app)
      .get("/bookings?deviceId=gsatd12-124nasf")
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });

    expect(mockedService.listBookings).toHaveBeenLastCalledWith(
      "gsatd12-124nasf"
    );
  });
});
