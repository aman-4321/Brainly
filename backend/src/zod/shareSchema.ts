import { z } from "zod";

export const shareSchema = z
  .object({
    share: z.boolean(),
    contentId: z.number(),
  })
  .refine((data) => data.share === true, {
    message: "For '/open', share must be true.",
    path: ["share"],
  });

export const disableShareSchema = z
  .object({
    share: z.boolean(),
    contentId: z.number(),
  })
  .refine((data) => data.share === false, {
    message: "For '/close', share must be false.",
    path: ["share"],
  });
