import { object, string, InferType } from "yup";
export const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});
export type LoginRequest = InferType<typeof loginSchema>;
