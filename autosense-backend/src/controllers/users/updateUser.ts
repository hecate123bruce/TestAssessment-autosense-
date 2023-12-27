import { Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { userService } from "services";
import { errorHandlerWrapper } from "utils";
import { PHONENUMBERREGEX } from "consts";
import { AuthRequest } from "type";

export const updateUserValidator = () => {
  return [
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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};
type ReqQuery = unknown;

export const updateUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { firstName, lastName, phoneNumber, address } = req.body;
  const { email } = req.user;

  const result = await userService.updateUser({
    key: {
      email,
    },
    updateUser: {
      firstName,
      lastName,
      phoneNumber,
      address,
    },
  });

  return res.status(httpStatus.OK).json({
    message: "Success",
    data: result,
  });
};

export const updateUser = errorHandlerWrapper(updateUserHandler);
