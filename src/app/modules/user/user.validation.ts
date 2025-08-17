import z from "zod";
import { isActive, Role } from "./user.interfaces";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  email: z
    .string({ invalid_type_error: "Email must be a string" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),

  phone: z
    .string()
    .regex(/^(\+?88)?01[3-9]\d{8}$/, {
      message: "Invalid Bangladesh phone number",
    })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be a string" })
    .max(200, { message: "Address must be at most 200 characters long" })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),

  isActive: z.enum(Object.values(isActive) as [string]).optional(),

  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),

  isVarified: z
    .boolean({ invalid_type_error: "isVarified must be true or false" })
    .optional(),

  phone: z
    .string()
    .regex(/^(\+?88)?01[3-9]\d{8}$/, {
      message: "Invalid Bangladesh phone number",
    })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be a string" })
    .max(200, { message: "Address must be at most 200 characters long" })
    .optional(),
});
