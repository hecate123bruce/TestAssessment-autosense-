import { Response } from "express";
import httpStatus from "http-status";

import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { AuthRequest } from "type";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const deleteUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.user;
  const result = await userService.deleteUser({
    email,
  });
  if (result) {
    return res.status(httpStatus.OK).json({
      message: "Success",
      data: result,
    });
  } else {
    return res.status(httpStatus.NOT_FOUND).json({
      message: ["User not found"],
    });
  }
};

export const deleteUser = errorHandlerWrapper(deleteUserHandler);
