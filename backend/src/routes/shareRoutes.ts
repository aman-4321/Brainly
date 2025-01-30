import express from "express";
import { authMiddleware } from "../middleware/middleware";
import {
  CloseAll,
  GetAllContent,
  ShareAllContent,
} from "../controller/share.controller";

export const shareRouter = express.Router();

// shareRouter.post("/open", authMiddleware, shareContent);

// shareRouter.get("/open/:hash", getContentByHash);

shareRouter.post("/openall", authMiddleware, ShareAllContent);

shareRouter.get("/openall/:hash", GetAllContent);

// shareRouter.delete("/close", authMiddleware, closeContent);

shareRouter.post("/closeall", authMiddleware, CloseAll);
