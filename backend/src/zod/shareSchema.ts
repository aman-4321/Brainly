import { z } from "zod";

export const linkSchema = z.object({
  link: z.boolean(),
});
