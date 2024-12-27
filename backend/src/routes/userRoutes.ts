import express from "express";
import { userSignin, userSignup } from "../controller/user.controller";

export const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/signin", userSignin);
