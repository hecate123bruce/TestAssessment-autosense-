import { Request, Response } from "express";
import dns from "dns";
import { body } from "express-validator";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { SECRETKEY } from "consts";

export const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not correct")
      .custom(async (value) => {
        const domain = value.split("@")[1];
        try {
          await dns.promises.resolveMx(domain);
          return true;
        } catch (err) {
          throw new Error("Email domain is not valid");
        }
      }),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};
type ReqQuery = unknown;

export const loginUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  // user exist check
  if (user) {
    //check password match
    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };

      try {
        //generate token
        const token = await jwt.sign(tokenData, SECRETKEY, {
          expiresIn: "30min",
        });
        return res.status(httpStatus.OK).json({
          message: "Success",
          token: "Bearer " + token,
          user: {
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
          },
        });
      } catch (err) {
        throw new Error("fail to create token");
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: ["Password is incorrect"],
      });
    }
  }

  return res.status(httpStatus.BAD_REQUEST).json({
    message: ["User not exist"],
  });
};

export const loginUser = errorHandlerWrapper(loginUserHandler);
