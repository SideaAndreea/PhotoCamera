import {
  loginController,
  registerController,
} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

export default userRouter;
