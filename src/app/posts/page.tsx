"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { withAuth } from "@/components/hoc/withAuth";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CategoryFilter } from "@/components/molecules/CategoryFilter";
import { SortSelect } from "@/components/molecules/SortSelect";
import { PostTable } from "@/components/organisms/PostTable";
import { Button } from "@/components/atoms/Button";
import { usePosts } from "@/hooks/usePosts";
import { CategoryType, SortFieldType, SortOrderType, PostType } from "@/types/post.types";

function PostsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<CategoryType | "ALL">("ALL");
    const [sortField, setSortField] = useState<SortFieldType>("createdAt");
    const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = usePosts({
        search: search || undefined,
        category: category === "ALL" ? undefined : category,
        sort: sortField,
        order: sortOrder,
    });

    const posts = data?.pages.flatMap((page) => page.items) ?? [];

    const handleRowClick = (post: PostType) => {
        router.push(`/posts/${post.id}`);
    };

    const handleSortChange = (field: SortFieldType, order: SortOrderType) => {
        setSortField(field);
        setSortOrder(order);
    };

    return (
        <Box className="p-8 max-w-5xl mx-auto">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-bold">
              게시판
            </Typography>
            <Button variant="contained" onClick={() => router.push("/posts/new")}>
              글쓰기
            </Button>
          </Box>
            {/* 필터 영역 */}
          <Box className="flex flex-wrap gap-4 mb-4">
                <CategoryFilter value={category} onChange={setCategory} />
                <SortSelect
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSortChange={handleSortChange}
                />
                <SearchBar onSearch={setSearch} placeholder="제목/본문 검색" />
           </Box>
            {/* 테이블 */}
            <PostTable
                posts={posts}
                isLoading={isLoading}
                hasNextPage={!!hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onRowClick={handleRowClick}
            />
        </Box>
    );
}

export default withAuth(PostsPage);