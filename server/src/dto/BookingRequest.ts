export class BookingRequest {
  public constructor(
    public deviceId: string,
    public roomId: number,
    public checkIn: Date,
    public checkOut: Date
  ) {}
}
