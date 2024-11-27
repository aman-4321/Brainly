import { Request, Response, Router } from "express";
import { shareSchema } from "../zod/shareSchema";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware } from "../middleware/middleware";
import { PrismaClient } from "@prisma/client";

export const shareRouter = Router();
const prisma = new PrismaClient();

shareRouter.post(
  "/open",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(req.userId);
    const { success, data, error } = shareSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        message:
          "Invalid inputs. Please provide a valid content ID and share flag.",
        error: error.errors,
      });
      return;
    }
    const { share, contentId } = data;

    if (!share) {
      res.status(400).json({
        message: "For '/open', share must be true.",
      });
      return;
    }

    try {
      const content = await prisma.content.findUnique({
        where: { id: contentId },
        select: { id: true, userId: true, isPrivate: true },
      });

      if (!content) {
        res.status(404).json({ message: "Content not found" });
        return;
      }

      if (content.userId !== userId) {
        res
          .status(403)
          .json({ message: "You don't have permission to share this content" });
        return;
      }

      if (share) {
        const existingLink = await prisma.link.findUnique({
          where: { userId },
        });

        let hash: string;

        if (existingLink) {
          hash = existingLink.hash;
        } else {
          hash = uuidv4();

          await prisma.link.create({
            data: {
              hash,
              userId,
            },
          });
        }

        await prisma.content.update({
          where: { id: contentId },
          data: { isPrivate: false },
        });

        res.status(200).json({
          link: hash,
        });
        return;
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
    return;
  },
);

shareRouter.get("/open/:hash", async (req: Request, res: Response) => {});

shareRouter.post(
  "/openall",
  authMiddleware,
  async (req: Request, res: Response) => {},
);

shareRouter.get("/openall/:hash", async (req: Request, res: Response) => {});

shareRouter.post(
  "/close",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(req.userId);
    const { success, data, error } = shareSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        message:
          "Invalid inputs. Please provide a valid content ID and share flag.",
        error: error.errors,
      });
      return;
    }

    const { contentId, share } = data;

    if (share) {
      res.status(400).json({
        message: "For '/close', share must be false.",
      });
      return;
    }

    try {
      const content = await prisma.content.findUnique({
        where: { id: contentId },
        select: { id: true, userId: true, isPrivate: true },
      });

      if (!content) {
        res.status(404).json({ message: "Content not found" });
        return;
      }

      if (content.userId !== userId) {
        res.status(403).json({
          message:
            "You don't have permission to disable sharing for this content",
        });
        return;
      }

      await prisma.content.update({
        where: { id: contentId },
        data: { isPrivate: true },
      });

      const existingLink = await prisma.link.findUnique({
        where: { userId },
      });

      if (existingLink) {
        await prisma.link.delete({
          where: { userId },
        });
        return;
      }

      res.status(200).json({ message: "Content sharing disabled" });
      return;
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
    return;
  },
);

shareRouter.delete(
  "/closeall",
  authMiddleware,
  async (req: Request, res: Response) => {},
);
