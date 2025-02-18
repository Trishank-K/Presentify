"use client";

import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50),
  email: z.string().email("Enter a Valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const signInSchema = z.object({
  email: z.string().email("Enter a Valid email address"),
  password: z.string().min(8),
});
