import { Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import { userService } from "services";

import { SECRETKEY } from "consts";
import { MESSAGES } from "consts";

export const checkAuth = async (req: any, res: Response, next: Function) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, SECRETKEY);
    req.user = data;

    const user = await userService.getUserByEmail(req.user.email);

    if (!user) {
      throw new Error(MESSAGES.USER_IS_NOT_EXIST);
    }

    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: MESSAGES.UNAUTHORIZED,
    });
  }
};
