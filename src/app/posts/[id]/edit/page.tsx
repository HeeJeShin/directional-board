"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/components/hoc/withAuth";
import { PostForm } from "@/components/organisms/post/PostForm";
import { Button } from "@/components/atoms/Button";
import { usePost } from "@/hooks/usePosts";
import { COLORS } from "@/styles/theme";

interface EditPostPageProps {
    params: Promise<{ id: string }>;
}

const EditPostPage = ({ params }: EditPostPageProps) => {
    const { id } = use(params);
    const router = useRouter();
    const { data: post, isLoading, error } = usePost(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2"
                    style={{ borderColor: COLORS.primary }}
                />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="p-8 max-w-3xl mx-auto text-center">
                <p className="text-red-500 mb-4">게시글을 찾을 수 없습니다</p>
                <Button variant="outlined" onClick={() => router.push("/posts")}>
                    목록으로
                </Button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1
                className="text-2xl font-bold mb-8"
                style={{ color: COLORS.text }}
            >
                게시글 수정
            </h1>
            <div
                className="rounded-xl border p-8"
                style={{
                    backgroundColor: COLORS.background,
                    borderColor: COLORS.borderLight,
                }}
            >
                <PostForm mode="edit" initialData={post} />
            </div>
        </div>
    );
};

export default withAuth(EditPostPage);