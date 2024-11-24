import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(5, "username must be atleast 5 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "password must contain atleast 8 characters")
    .max(20),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});
