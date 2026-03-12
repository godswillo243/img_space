import z from "zod";

export const signUpValidationSchema = z.object({
  username: z
    .string("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: z.email("Please provide a valid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const signInValidationSchema = z.object({
  email: z.string("Email is required"),
  password: z.string("Password is required"),
});

export const createImageValidationSchema = z.object({
  url: z.url("Please provide a valid URL"),
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()),
});
