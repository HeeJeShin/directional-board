"use client";

import { Box, Typography, Paper } from "@mui/material";
import { withAuth } from "@/components/hoc/withAuth";
import { PostForm } from "@/components/organisms/PostForm";

function NewPostPage() {
    return (
        <Box className="p-8 max-w-3xl mx-auto">
          <Typography variant="h5" className="font-bold mb-6">
            새 게시글 작성
          </Typography>
          <Paper className="p-6">
            <PostForm />
          </Paper>
        </Box>
    );
}

export default withAuth(NewPostPage);