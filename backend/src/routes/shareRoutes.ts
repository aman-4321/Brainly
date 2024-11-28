import { Request, Response, Router } from "express";
import { disableShareSchema, shareSchema } from "../zod/shareSchema";
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

    const { contentId } = data;

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

      const existingLink = await prisma.link.findUnique({
        where: {
          contentId,
          userId,
        },
      });

      if (existingLink) {
        res.status(200).json({
          message: "Link already exists for this content.",
          link: existingLink.hash,
        });
        return;
      }

      const hash = uuidv4();

      await prisma.link.create({
        data: {
          hash,
          userId,
          contentId,
        },
      });

      await prisma.content.update({
        where: { id: contentId },
        data: { isPrivate: false },
      });

      res.status(200).json({
        message: "Link created successfully.",
        link: hash,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
  },
);

shareRouter.get("/open/:hash", async (req: Request, res: Response) => {
  const hash = req.params.hash;

  try {
    const link = await prisma.link.findUnique({
      where: { hash },
      select: { contentId: true },
    });

    if (!link || link.contentId === null) {
      res.status(404).json({
        message: "Link not found",
      });
      return;
    }

    const content = await prisma.content.findUnique({
      where: { id: link.contentId },
      select: {
        id: true,
        title: true,
        link: true,
        type: true,
        tags: true,
        isPrivate: true,
      },
    });

    if (!content) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    if (content.isPrivate) {
      res.status(403).json({
        message: "This content is private",
      });
      return;
    }

    res.status(200).json({
      content: {
        id: content.id,
        title: content.title,
        link: content.link,
        type: content.type,
        tags: content.tags,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching the content",
    });
  }
});

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
    const { success, data, error } = disableShareSchema.safeParse(req.body);

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

      if (content.isPrivate) {
        res.status(400).json({
          message: "Sharing is already disabled for this content",
        });
        return;
      }

      await prisma.content.update({
        where: { id: contentId },
        data: { isPrivate: true },
      });

      const existingLink = await prisma.link.findUnique({
        where: {
          userId,
          contentId,
        },
      });

      if (existingLink) {
        await prisma.link.delete({
          where: {
            id: existingLink.id,
          },
        });
      }

      res.status(200).json({
        message: "Content sharing disabled",
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
  },
);

shareRouter.delete(
  "/closeall",
  authMiddleware,
  async (req: Request, res: Response) => {},
);
