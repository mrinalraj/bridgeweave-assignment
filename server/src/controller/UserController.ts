import { Request, Router } from "express";
import { UserRequest } from "../dto/UserRequest";
import { UserService } from "../service/UserService";
import { ResponseBuilder } from "../utils/ResponseBuilder";

export const UserController = Router();

UserController.route("/").get((req, res) => {
  res.json({ message: "Hello, World!" });
});

UserController.route("/").post(
  async (req: Request<any, any, UserRequest, any>, res) => {
    const user = await UserService.createUser(req.body);
    res.json(new ResponseBuilder().setData(user));
  }
);
