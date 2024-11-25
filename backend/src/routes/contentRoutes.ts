import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { addSchema } from "../zod/contentSchema";
import { PrismaClient } from "@prisma/client";

export const contentRouter = Router();
const prisma = new PrismaClient();

contentRouter.post(
  "/add",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { success, error, data } = addSchema.safeParse(req.body);

      if (!success) {
        res.status(403).json({
          message: "Invalid Inputs",
          error: error.errors,
        });
        return;
      }

      const { tags, link, type, title } = data;

      const existingTags = await Promise.all(
        tags?.map(async (tagTitle) => {
          return prisma.tags.upsert({
            where: { title: tagTitle },
            update: {},
            create: { title: tagTitle },
          });
        }) || [],
      );

      const content = await prisma.content.create({
        data: {
          link,
          type,
          title,
          user: {
            connect: { id: Number(req.userId) },
          },
          tags: {
            connect: existingTags.map((tag) => ({ id: tag.id })),
          },
        },
        include: {
          tags: true,
        },
      });

      res.status(201).json({
        message: "Content added successfully",
        id: content.id,
        content,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error making Content",
        err,
      });
    }
  },
);

contentRouter.get(
  "/get",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(req.userId);

    try {
      const content = await prisma.content.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          link: true,
          type: true,
          title: true,
          tags: {
            select: {
              id: true,
              title: true,
            },
          },
          userId: true,
        },
      });

      res.status(200).json({
        content,
      });
      return;
    } catch (err) {
      res.status(500).json({
        message: "Unable to fetch content",
        err,
      });
    }
  },
);
