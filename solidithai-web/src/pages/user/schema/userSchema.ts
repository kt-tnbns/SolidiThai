import { z } from "zod"

export const baseUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
})

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(8),
})

export const updateUserSchema = baseUserSchema.partial()

export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
