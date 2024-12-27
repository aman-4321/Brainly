import express from "express";
import { authMiddleware } from "../middleware/middleware";
import {
  closeall,
  closeContent,
  getallContent,
  getContentByHash,
  openallContent,
  shareContent,
} from "../controller/share.controller";

export const shareRouter = express.Router();

shareRouter.post("/open", authMiddleware, shareContent);

shareRouter.get("/open/:hash", getContentByHash);

shareRouter.post("/openall", authMiddleware, openallContent);

shareRouter.get("/openall/:hash", getallContent);

shareRouter.delete("/close", authMiddleware, closeContent);

shareRouter.delete("/closeall", authMiddleware, closeall);
