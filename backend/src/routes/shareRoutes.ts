import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/middleware";

export const shareRouter = Router();

shareRouter.post("/open", authMiddleware, (req: Request, res: Response) => {});

shareRouter.post(
  "/openall",
  authMiddleware,
  (req: Request, res: Response) => {},
);
