import { z } from "zod";

export const validation = z.object({
  title: z
    .string()
    .nonempty("入力必須ですよ！")
    .max(30, "30文字以下で入力してくださいね！"),
  detail: z.string().max(50, "50文字以下で入力してくださいね！"),
  url: z
    .string()
    .nonempty("入力必須ですよ！")
    .url("正しいURLを入力してください！"),
});

export const validationGroup = z.object({
  group_name: z.string().max(30, "30文字以下で入力してくださいね！"),
});
