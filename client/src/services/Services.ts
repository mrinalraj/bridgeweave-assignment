// Purpose: Service to fetch data from the server.

import { BookingRequest } from "../models/BookingRequest";
import { Filters } from "../models/Filters";
import { UserRequest } from "../models/UserRequest";

const base = "http://localhost:8001";
export default {
  getAllHotels: () => fetch(`${base}/hotels/list`).then((res) => res.json()),
  getHotelById: (id: string) =>
    fetch(`${base}/hotels/${id}`).then((res) => res.json()),

  getHotelsWithFilter: (filter: Filters) => {
    const emptyRemoved = Object.assign(
      {},
      ...Object.entries(filter)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => ({ [key]: value }))
    );

    const query = new URLSearchParams(
      emptyRemoved as Record<string, any>
    ).toString();
    return fetch(`${base}/hotels/search?${query}`).then((res) => res.json());
  },

  getBookingList: (deviceId: string) =>
    fetch(`${base}/bookings?deviceId=${deviceId}`).then((res) => res.json()),

  cancelBooking: (bookingId: number) =>
    fetch(`${base}/bookings/${bookingId}`, { method: "DELETE" }).then((res) =>
      res.json()
    ),

  getRoom: (id: number) =>
    fetch(`${base}/rooms/${id}`).then((res) => res.json()),

  createUser: (user: UserRequest) =>
    fetch(`${base}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),

  createBooking: (booking: BookingRequest) =>
    fetch(`${base}/bookings`, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),
};
