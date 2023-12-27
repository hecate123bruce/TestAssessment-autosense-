import { Response } from "express";
import httpStatus from "http-status";

import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { AuthRequest } from "type";

type Params = {
  email: string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.user;
  const users = await userService.getUser({
    email,
  });
  if (users.length) {
    return res.status(httpStatus.OK).json({
      message: "Success",
      data: users[0],
    });
  } else {
    return res.status(httpStatus.NOT_FOUND).json({
      message: ["User not found"],
    });
  }
};

export const getUser = errorHandlerWrapper(getUserHandler);
