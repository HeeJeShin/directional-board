"use client";

import { useForm, Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Input } from "@/components/atoms/Input";
import { TextArea } from "@/components/atoms/TextArea";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { postSchema, PostFormType } from "@/lib/validations/post";
import { useCreatePost, useUpdatePost } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";
import { PostType } from "@/types/post.types";

const categoryOptions = [
    { value: "NOTICE", label: "NOTICE" },
    { value: "QNA", label: "QNA" },
    { value: "FREE", label: "FREE" },
];

interface PostFormProps {
    mode?: "create" | "edit";
    initialData?: PostType;
}

export function PostForm({ mode = "create", initialData }: PostFormProps) {
    const router = useRouter();
    const toast = useToast();
    const { mutate: createPost, isPending: isCreating } = useCreatePost();
    const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

    const isPending = isCreating || isUpdating;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PostFormType>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            body: initialData?.body ?? "",
            category: initialData?.category ?? ("" as "NOTICE" | "QNA" | "FREE"),
            tags: initialData?.tags?.join(", ") ?? "",
        },
    });

    const onSubmit = (data: PostFormType) => {
        const payload = {
            title: data.title,
            body: data.body,
            category: data.category,
            tags: data.tags
                ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                : undefined,
        };

        if (mode === "edit" && initialData) {
            updatePost(
                { id: initialData.id, data: payload },
                {
                    onSuccess: () => {
                        toast.success("게시글이 수정되었습니다");
                        router.push(`/posts/${initialData.id}`);
                    },
                    onError: () => {
                        toast.error("게시글 수정에 실패했습니다");
                    },
                }
            );
        } else {
            createPost(payload, {
                onSuccess: () => {
                    toast.success("게시글이 작성되었습니다");
                    router.push("/posts");
                },
                onError: () => {
                    toast.error("게시글 작성에 실패했습니다");
                },
            });
        }
    };

    const onError = (fieldErrors: FieldErrors<PostFormType>) => {
        const firstError =
            fieldErrors.category?.message ||
            fieldErrors.title?.message ||
            fieldErrors.body?.message;

        if (firstError) {
            toast.error(firstError);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
        >
      <Controller
          name="category"
          control={control}
          render={({ field }) => (
              <Select
                  label="카테고리"
                  options={categoryOptions}
                  error={!!errors.category}
                  {...field}
              />
          )}
      />

      <Input
          label="제목"
          {...register("title")}
          error={!!errors.title}
      />

      <TextArea
          label="내용"
          {...register("body")}
          error={!!errors.body}
      />

      <Input
          label="태그 (쉼표로 구분)"
          {...register("tags")}
          placeholder="예: React, Next.js, TypeScript"
      />

      <Box className="flex gap-2 justify-end">
        <Button
            variant="outlined"
            onClick={() => router.back()}
            type="button"
        >
          취소
        </Button>
        <Button variant="contained" type="submit" loading={isPending}>
          {mode === "edit" ? "수정" : "작성"}
        </Button>
      </Box>
    </Box>
    );
}