"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { usePosts } from "@/hooks/usePosts";
import { CategoryType, SortFieldType, SortOrderType, PostType } from "@/types/post.types";
import { COLORS } from "@/styles/theme";
import { PostTable } from "@/components/organisms/post/PostTable";
import { withAuth } from "@/components/hoc/withAuth";
import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select";
import { SearchBar } from "@/components/atoms/SearchBar";
import { CategoryTabs } from "@/components/molecules/CategoryTabs";

const categories = [
    { value: "ALL", label: "ALL" },
    { value: "NOTICE", label: "NOTICE" },
    { value: "QNA", label: "Q&A" },
    { value: "FREE", label: "FREE" },
];

const sortOptions = [
    { value: "createdAt-desc", label: "최신순" },
    { value: "createdAt-asc", label: "오래된순" },
    { value: "title-asc", label: "제목 오름차순" },
    { value: "title-desc", label: "제목 내림차순" },
];

const PostsPage = () => {
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

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split("-") as [SortFieldType, SortOrderType];
        setSortField(field);
        setSortOrder(order);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value as CategoryType | "ALL");
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 4, md: 8 }, maxWidth: "896px", mx: "auto" }}>
            {/* 상단: 제목 + 검색바 - 모바일에서 세로 배치 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: { xs: 2, sm: 0 },
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: COLORS.text }}
                >
                    게시판
                </Typography>
                <SearchBar
                    onSearch={setSearch}
                    placeholder="검색해보세요."
                />
            </Box>

            {/* 카테고리 탭 */}
            <CategoryTabs
                tabs={categories}
                value={category}
                onChange={handleCategoryChange}
            />

            {/* 컨트롤 바: 글쓰기 + 정렬 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 2,
                }}
            >
                <Button
                    variant="outlined"
                    size="md"
                    startIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>
                    }
                    onClick={() => router.push("/posts/new")}
                >
                    글쓰기
                </Button>

                <Select
                    options={sortOptions}
                    value={`${sortField}-${sortOrder}`}
                    onChange={handleSortChange}
                />
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
};

export default withAuth(PostsPage);