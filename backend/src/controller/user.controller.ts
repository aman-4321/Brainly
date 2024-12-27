import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { signinSchema, signupSchema } from "../zod/userSchema";

const prisma = new PrismaClient();

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = signupSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Invalid inputs",
        error: error.errors,
      });
      return;
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (userExists) {
      if (userExists.email === data.email) {
        res.status(403).json({
          message: "User with this email already exists",
        });
        return;
      }

      if (userExists.username === data.username) {
        res.status(403).json({
          message: "This username already exists",
        });
        return;
      }
    }

    const { email, password, username } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const userId = user.id;
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User Created Successfully",
      username,
      email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while Signing up ",
      error: err,
    });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = signinSchema.safeParse(req.body);

    if (!success) {
      res.status(411).json({
        message: "Invalid Inputs",
        error: error.errors,
      });
      return;
    }

    const { email, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid password",
      });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged in successfully",
      userId: user.id,
      email: user.email,
    });
  } catch (err) {
    console.log(err, JWT_SECRET);
    res.status(500).json({
      message: "Error during Signing in",
      error: err,
    });
  }
};
