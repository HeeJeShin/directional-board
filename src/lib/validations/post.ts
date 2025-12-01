import { z } from "zod";
import { containsForbiddenWord } from "@/constants/forbidden";

export const postSchema = z.object({
    title: z
        .string()
        .min(1, "제목을 입력해주세요")
        .max(100, "제목은 100자 이내로 입력해주세요")
        .refine((val) => !containsForbiddenWord(val), "금칙어가 포함되어 있습니다"),
    body: z
        .string()
        .min(1, "내용을 입력해주세요")
        .refine((val) => !containsForbiddenWord(val), "금칙어가 포함되어 있습니다"),
    category: z.enum(["NOTICE", "QNA", "FREE"], {
        message: "카테고리를 선택해주세요",
    }),
    tags: z.string().optional(),
});

export type PostFormType = z.infer<typeof postSchema>;