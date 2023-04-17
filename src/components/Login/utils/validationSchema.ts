import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .nonempty("nameは必須です")
    .min(4, "nameは4文字以上で入力してください"),
  email: z
    .string()
    .nonempty("emailは必須です")
    .email("正しいemailを入力してください"),
  password: z
    .string()
    .nonempty("passwordは必須です")
    .min(6, "passwordは6文字以上で入力してください"),
});
