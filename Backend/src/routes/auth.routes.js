import express from "express";

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.get("/logout", logoutUserController);
authRouter.get("/get-me", authUser, getMeController);

export default authRouter;
