"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Tag } from "@/components/atoms/Tag";
import { PostType } from "@/types/post.types";

interface PostTableProps {
    posts: PostType[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
    onRowClick?: (post: PostType) => void;
}

export function PostTable({
                              posts,
                              isLoading,
                              hasNextPage,
                              fetchNextPage,
                              isFetchingNextPage,
                              onRowClick,
                          }: PostTableProps) {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <Box className="flex justify-center p-8">
                <CircularProgress />
            </Box>
        );
    }

    if (posts.length === 0) {
        return (
            <Box className="flex justify-center p-8">
                <Typography color="text.secondary">게시글이 없습니다</Typography>
            </Box>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR");
    };

    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>카테고리</TableCell>
                <TableCell>제목</TableCell>
                <TableCell width={120}>작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                  <TableRow
                      key={post.id}
                      hover
                      onClick={() => onRowClick?.(post)}
                      sx={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                  <TableCell>
                    <Tag category={post.category} />
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
                {/* 무한스크롤 트리거 */}
            <Box ref={ref} className="flex justify-center p-4">
             {isFetchingNextPage && <CircularProgress size={24} />}
            </Box>
        </TableContainer>
    );
}