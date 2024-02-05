import DBClient from "./DBClient";

const user = DBClient.user;

export class UserRepository {
  public static findByDeviceId(deviceId: string) {
    return user.findFirst({
      where: { deviceId },
    });
  }

  public static save = user.create;
  public static update = user.update;
}
