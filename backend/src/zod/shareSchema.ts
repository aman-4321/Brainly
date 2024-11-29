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

export const shareAllScheam = z
  .object({
    share: z.boolean(),
  })
  .refine((data) => data.share === true, {
    message: "For '/openall' share must be true",
  });

export const disableAllSchema = z
  .object({
    share: z.boolean(),
  })
  .refine((data) => data.share === false, {
    message: "For '/closeall' share must be false",
  });
