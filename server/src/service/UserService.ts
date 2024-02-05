import { User } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository";
import { BadRequest } from "../utils/Errors";
import { UserRequest } from "../dto/UserRequest";

export class UserService {
  public static async createUser(request: UserRequest) {
    const userExist = await UserRepository.findByDeviceId(request.deviceId);
    if (userExist) {
      const user = await UserRepository.update({
        where: { id: userExist.id },
        data: { deviceId: request.deviceId },
      });

      return user;
    } else {
      const user = await UserRepository.save({
        data: {
          name: request.name,
          email: request.email,
          phone: request.phone,
          deviceId: request.deviceId,
        },
      });

      return user;
    }
  }

  public static async findByDeviceId(deviceId: string) {
    const user = await UserRepository.findByDeviceId(deviceId);

    if (user == null) throw new BadRequest("User not found");

    return user;
  }
}
