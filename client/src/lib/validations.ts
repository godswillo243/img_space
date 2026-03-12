// src/schemas/authSchemas.ts
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(64, { message: "Password is too long (max 64 characters)" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username cannot exceed 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      })
      .trim(),

    email: z
      .email({ message: "Please enter a valid email address" })
      .min(1, "Email is required")
      .max(255)
      .trim(),

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .trim(),

  password: z.string().min(1, { message: "Password is required" }),
});

export const createImageSchema = z.object({
  url: z.url("Please provide a valid URL"),
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;

export const imageFileSchema = z
  .instanceof(File, { message: "Please select a file" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
        file.type,
      ),
    {
      message: "Only JPG, JPEG, PNG, and WebP images are allowed",
    },
  );

export const updateImageSchema = z.object({
  url: z.url("Please provide a valid URL"),
  title: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  category: z.string(),
  tags: z.array(z.string()),
});
