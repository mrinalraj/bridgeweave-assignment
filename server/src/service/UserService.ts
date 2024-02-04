import { UserRepository } from "../repository/UserRepository";
import { BadRequest } from "../utils/Errors";

export class UserService {
  public static async createUser(request: any) {
    const user = await UserRepository.save(request);
    return user;
  }

  public static async findByDeviceId(deviceId: string) {
    const user = await UserRepository.findByDeviceId(deviceId);

    if (user == null) throw new BadRequest("User not found");

    return user;
  }
}
