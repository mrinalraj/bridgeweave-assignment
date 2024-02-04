import { Prisma } from "@prisma/client";

type Hotel = Prisma.HotelGetPayload<{}>;
type Booking = Prisma.BookingGetPayload<{}>;
