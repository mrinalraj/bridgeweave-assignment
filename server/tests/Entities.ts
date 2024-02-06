import { Prisma } from "@prisma/client";

export type Hotel = Prisma.HotelGetPayload<{}>;
export type Booking = Prisma.BookingGetPayload<{}>;
export type Room = Prisma.RoomGetPayload<{}>;
