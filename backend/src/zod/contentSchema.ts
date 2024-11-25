import { z } from "zod";

export const addSchema = z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().url(),
  title: z.string().min(1, { message: "Title is required" }),
  tags: z.array(z.string()).optional(),
});
