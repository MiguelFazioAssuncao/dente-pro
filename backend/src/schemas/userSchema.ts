import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
