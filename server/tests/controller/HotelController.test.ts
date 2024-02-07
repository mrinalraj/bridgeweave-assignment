import request from "supertest";
import { app } from "../../src/app";
import { HotelService } from "../../src/service/HotelService";
import { hotel } from "../EntityFactory";
import { BadRequest } from "../../src/utils/Errors";

jest.mock("../../src/service/HotelService");

describe("HotelController", () => {
  const mockedService = jest.mocked(HotelService);

  test("listHotels", async () => {
    mockedService.listHotels.mockResolvedValue([hotel]);

    await request(app)
      .get("/hotels/list")
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
        expect(response.body.data.length).toBe(1);
      });
  });

  test("searchHotel", async () => {
    mockedService.searchHotel.mockResolvedValue([hotel]);
    const serviceSpy = jest.spyOn(HotelService, "searchHotel");

    await request(app)
      .get("/hotels/search")
      .query({ address: "test" })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });

    expect(mockedService.searchHotel).toHaveBeenLastCalledWith({
      address: "test",
    });
  });

  test("getHotelById", async () => {
    mockedService.getHotelById.mockResolvedValue(hotel);

    await request(app)
      .get(`/hotels/${hotel.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });
  });

  test("getHotelById - not found", async () => {
    mockedService.getHotelById.mockImplementation(() => {
      throw new BadRequest("Hotel not found");
    });

    await request(app).get(`/hotels/1`).expect(400);
  });

  test("checkAvailability", async () => {
    mockedService.checkAvailability.mockResolvedValue(hotel);

    await request(app)
      .get(`/hotels/${hotel.id}/availability`)
      .query({ checkIn: "2021-01-01", checkOut: "2021-01-02" })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).not.toBeNull();
      });

    expect(mockedService.checkAvailability).toHaveBeenCalledWith(
      hotel.id,
      "2021-01-01",
      "2021-01-02"
    );
  });
});
