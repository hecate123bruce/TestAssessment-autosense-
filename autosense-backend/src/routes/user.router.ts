import express from "express";

import { usersController } from "../controllers";
import { checkAuth } from "utils/auth";

const userRouter = express.Router();

// Create User
userRouter.post(
  "/",
  usersController.createUserValidator(),
  usersController.createUser
);

// Login User
userRouter.post(
  "/login",
  usersController.loginValidator(),
  usersController.loginUser
);

// Update User
userRouter.post(
  "/update",
  checkAuth,
  usersController.updateUserValidator(),
  usersController.updateUser
);

// Get User
userRouter.get("/me", checkAuth, usersController.getUser);

// Get Delete User By email
userRouter.delete("/", checkAuth, usersController.deleteUser);

export default userRouter;
