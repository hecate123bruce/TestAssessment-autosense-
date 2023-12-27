import { Request, Response } from "express";
import dns from "dns";
import { body } from "express-validator";
import httpStatus from "http-status";

import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { PHONENUMBERREGEX } from "consts";

export const createUserValidator = () => {
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
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone Number is required")
      .matches(PHONENUMBERREGEX)
      .withMessage("phone Number is nor valid"),
    body("address").notEmpty().withMessage("Address is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};
type ReqQuery = unknown;

export const createUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password, firstName, lastName, phoneNumber, address } =
    req.body;

  const users = await userService.getUser({
    email,
  });

  // user duplication check
  if (users.length > 0) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: ["User already exist"],
    });
  }

  const result = await userService.createUser({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
  });

  return res.status(httpStatus.OK).json({
    message: "Success",
    data: result,
  });
};

export const createUser = errorHandlerWrapper(createUserHandler);
