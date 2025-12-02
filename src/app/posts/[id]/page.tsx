"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/components/hoc/withAuth";
import { Button } from "@/components/atoms/Button";
import { usePost, useDeletePost } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";
import { COLORS } from "@/styles/theme";
import { CategoryType } from "@/types/post.types";

// 카테고리 태그
const categoryStyles: Record<CategoryType, { bg: string; text: string; border: string }> = {
    NOTICE: { bg: "#FEE2E2", text: "#B91C1C", border: "#FECACA" },
    QNA: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
    FREE: { bg: "#D1FAE5", text: "#047857", border: "#A7F3D0" },
};

const categoryLabels: Record<CategoryType, string> = {
    NOTICE: "NOTICE",
    QNA: "Q&A",
    FREE: "FREE",
};

interface PostDetailPageProps {
    params: Promise<{ id: string }>;
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
    const { id } = use(params);
    const router = useRouter();
    const toast = useToast();
    const { data: post, isLoading, error } = usePost(id);
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

    const handleEdit = () => {
        router.push(`/posts/${id}/edit`);
    };

    const handleDelete = () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        deletePost(id, {
            onSuccess: () => {
                toast.success("게시글이 삭제되었습니다");
                router.push("/posts");
            },
            onError: () => {
                toast.error("게시글 삭제에 실패했습니다");
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // 로딩
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

    // 에러
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

    const catStyle = categoryStyles[post.category];

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div
                className="rounded-xl border p-8"
                style={{
                    backgroundColor: COLORS.background,
                    borderColor: COLORS.borderLight,
                }}
            >
                {/* 헤더: 카테고리 + 날짜 */}
                <div className="flex items-center gap-3 mb-6">
                    <span
                        className="px-3 py-1 rounded-md text-sm font-medium border"
                        style={{
                            backgroundColor: catStyle.bg,
                            color: catStyle.text,
                            borderColor: catStyle.border,
                        }}
                    >
                        {categoryLabels[post.category]}
                    </span>
                    <span
                        className="text-sm"
                        style={{ color: COLORS.textSecondary }}
                    >
                        {formatDate(post.createdAt)}
                    </span>
                </div>

                {/* 제목 */}
                <h1
                    className="text-2xl font-bold mb-6"
                    style={{ color: COLORS.text }}
                >
                    {post.title}
                </h1>

                {/* 구분선 */}
                <div
                    className="h-px mb-6"
                    style={{ backgroundColor: COLORS.borderLight }}
                />

                {/* 본문 */}
                <div
                    className="whitespace-pre-wrap min-h-[200px] leading-relaxed mb-8"
                    style={{ color: COLORS.text }}
                >
                    {post.body}
                </div>

                {/* 태그 */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-8">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-sm font-medium border"
                                style={{
                                    backgroundColor: COLORS.primaryBgLight,
                                    color: COLORS.primary,
                                    borderColor: COLORS.borderLight,
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* 구분선 */}
                <div
                    className="h-px mb-6"
                    style={{ backgroundColor: COLORS.borderLight }}
                />

                {/* 버튼 */}
                <div className="flex justify-between items-center">
                    <Button variant="outlined" onClick={() => router.push("/posts")}>
                        목록
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outlined" onClick={handleEdit}>
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDelete}
                            loading={isDeleting}
                            style={{
                                backgroundColor: "#dc2626",
                            }}
                        >
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(PostDetailPage);