"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Paper, Divider, CircularProgress, Chip } from "@mui/material";
import { withAuth } from "@/components/hoc/withAuth";
import { Button } from "@/components/atoms/Button";
import { Tag } from "@/components/atoms/Tag";
import { usePost, useDeletePost } from "@/hooks/usePosts";
import { useToast } from "@/hooks/useToast";

interface PostDetailPageProps {
    params: Promise<{ id: string }>;
}

function PostDetailPage({ params }: PostDetailPageProps) {
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

    if (isLoading) {
        return (
            <Box className="min-h-screen flex items-center justify-center">
                <CircularProgress sx={{ color: "#1C4E4E" }} />
          </Box>
        );
    }

    if (error || !post) {
        return (
            <Box className="p-8 max-w-3xl mx-auto text-center">
        <Typography color="error">게시글을 찾을 수 없습니다</Typography>
        <Button variant="outlined" onClick={() => router.push("/posts")} className="mt-4">
          목록으로
        </Button>
      </Box>
        );
    }

    return (
        <Box className="p-8 max-w-3xl mx-auto">
      <Paper className="p-6">
        {/* 헤더 */}
          <Box className="flex items-center gap-2 mb-4">
          <Tag category={post.category} />
          <Typography variant="caption" className="text-text-secondary">
            {formatDate(post.createdAt)}
          </Typography>
        </Box>

          {/* 제목 */}
          <Typography variant="h5" className="font-bold mb-4">
          {post.title}
        </Typography>

        <Divider className="my-4" />

          {/* 본문 */}
          <Typography className="whitespace-pre-wrap min-h-[200px]">
              {post.body}
          </Typography>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
              <Box className="flex gap-2 mt-6 flex-wrap">
            {post.tags.map((tag) => (
                <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
            ))}
          </Box>
          )}

          <Divider className="my-6" />

          {/* 버튼 */}
          <Box className="flex justify-between">
          <Button variant="outlined" onClick={() => router.push("/posts")}>
            목록
          </Button>
          <Box className="flex gap-2">
            <Button variant="outlined" onClick={handleEdit}>
              수정
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                loading={isDeleting}
                sx={{
                    backgroundColor: "#dc2626",
                    "&:hover": { backgroundColor: "#b91c1c" },
                }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
    );
}

export default withAuth(PostDetailPage);