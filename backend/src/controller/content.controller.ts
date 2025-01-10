import { Request, Response } from "express";
import { addSchema } from "../zod/contentSchema";
import { prisma } from "../db";

export const addContent = async (req: Request, res: Response) => {
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
};

export const getContent = async (req: Request, res: Response) => {
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
};

export const getContentByID = async (req: Request, res: Response) => {
  const userId = Number(req.userId);
  const contentId = Number(req.params.id);

  if (isNaN(contentId)) {
    res.status(400).json({ message: "Invalid content ID" });
    return;
  }

  try {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
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

    if (!content) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    if (content.userId !== userId) {
      res.status(403).json({
        message: "You don't have permission to access this content",
      });
      return;
    }

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
};

type ContentType = "document" | "video" | "tweet" | "link";

export const getContentByType = async (req: Request, res: Response) => {
  const userId = Number(req.userId);
  const type = req.params.type.toLowerCase();

  const validTypes = ["document", "tweet", "video", "link"];
  if (!validTypes.includes(type)) {
    res.status(400).json({
      message:
        "Invalid content type. Must be one of: document, tweet, video, link",
    });
    return;
  }

  try {
    const content = await prisma.content.findMany({
      where: {
        userId: userId,
        type: type as ContentType,
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
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch content",
      err,
    });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  const userId = Number(req.userId);
  const contentId = Number(req.params.id);

  if (isNaN(contentId)) {
    res.status(400).json({ message: "Invalid content ID" });
    return;
  }

  try {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!content) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    if (content.userId !== userId) {
      res.status(403).json({
        message: "You do not have permission to delete this content",
      });
      return;
    }

    await prisma.content.delete({
      where: {
        id: contentId,
      },
    });

    res.status(200).json({
      message: "Content deleted successfully",
      id: contentId,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to delete the content",
      err,
    });
  }
};
