import express from "express";

import userRouter from "./user.router";

const appRoutes = express.Router();

appRoutes.use("/users", userRouter);

export default appRoutes;
