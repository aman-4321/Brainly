import express from "express";
import { authMiddleware } from "../middleware/middleware";
import {
  addContent,
  deleteContent,
  getContent,
  getContentByID,
} from "../controller/content.controller";

export const contentRouter = express.Router();

contentRouter.post("/add", authMiddleware, addContent);

contentRouter.get("/get", authMiddleware, getContent);

contentRouter.get("/get/:id", authMiddleware, getContentByID);

contentRouter.delete("/delete/:id", authMiddleware, deleteContent);
