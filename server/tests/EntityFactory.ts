import { Room } from "./Entities";

export const hotel = {
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

export const room: Room = {
  id: 1,
  hotelId: 1,
  name: "Test",
  rent: 100,
  guests: 2,
  beds: 1,
  photos: ["Test"],
  inclusions: ["Test"],
};

export const booking = {
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
};
