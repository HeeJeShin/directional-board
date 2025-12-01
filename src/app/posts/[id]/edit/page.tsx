"use client";

import { use } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { withAuth } from "@/components/hoc/withAuth";
import { PostForm } from "@/components/organisms/PostForm";
import { Button } from "@/components/atoms/Button";
import { usePost } from "@/hooks/usePosts";

interface EditPostPageProps {
    params: Promise<{ id: string }>;
}

function EditPostPage({ params }: EditPostPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { data: post, isLoading, error } = usePost(id);

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
          <Typography variant="h5" className="font-bold mb-6">
            게시글 수정
          </Typography>
          <Paper className="p-6">
            <PostForm mode="edit" initialData={post} />
          </Paper>
        </Box>
    );
}

export default withAuth(EditPostPage);