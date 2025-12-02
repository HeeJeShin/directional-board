"use client";

import { useState, useMemo, useCallback } from "react";
import { useMockPosts } from "@/hooks/usePosts";
import { CategoryType, SortFieldType, SortOrderType, PostType } from "@/types/post.types";
import { COLORS } from "@/styles/theme";
import { PostTable } from "@/components/organisms/post/PostTable";
import { withAuth } from "@/components/hoc/withAuth";
import { Select } from "@/components/atoms/Select";
import { SearchBar } from "@/components/atoms/SearchBar";
import { CategoryTabs } from "@/components/molecules/CategoryTabs";

const PAGE_SIZE = 20; // 한 번에 보여줄 개수

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

const MockPostsPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<CategoryType | "ALL">("ALL");
    const [sortField, setSortField] = useState<SortFieldType>("createdAt");
    const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
    const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
    const [isFetchingNext, setIsFetchingNext] = useState(false);

    const { data, isLoading } = useMockPosts(300);
    const allPosts = data?.items ?? [];

    // 필터링 및 정렬
    const filteredPosts = useMemo(() => {
        let result = [...allPosts];

        // 카테고리 필터
        if (category !== "ALL") {
            result = result.filter((post) => post.category === category);
        }

        // 검색 필터
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchLower) ||
                    post.body.toLowerCase().includes(searchLower)
            );
        }

        // 정렬
        result.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortField === "createdAt") {
                const aDate = new Date(aValue).getTime();
                const bDate = new Date(bValue).getTime();
                return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return 0;
        });

        return result;
    }, [allPosts, category, search, sortField, sortOrder]);

    // 현재 표시할 게시글 (가상 페이지네이션)
    const visiblePosts = useMemo(() => {
        return filteredPosts.slice(0, displayCount);
    }, [filteredPosts, displayCount]);

    // 다음 페이지 존재 여부
    const hasNextPage = displayCount < filteredPosts.length;

    // 다음 페이지 로드 (가상)
    const fetchNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNext) return;

        setIsFetchingNext(true);

        // 실제 API 호출처럼 약간의 딜레이 추가
        setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filteredPosts.length));
            setIsFetchingNext(false);
        }, 300);
    }, [hasNextPage, isFetchingNext, filteredPosts.length]);

    // 필터 변경 시 displayCount 리셋
    const handleCategoryChange = (value: string) => {
        setCategory(value as CategoryType | "ALL");
        setDisplayCount(PAGE_SIZE);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setDisplayCount(PAGE_SIZE);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split("-") as [SortFieldType, SortOrderType];
        setSortField(field);
        setSortOrder(order);
        setDisplayCount(PAGE_SIZE);
    };

    const handleRowClick = (post: PostType) => {
        alert(`목업 게시글: ${post.title}\n\n${post.body}`);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* 상단: 제목 + 검색바 */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: COLORS.text }}
                    >
                        게시판
                    </h1>
                    <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: COLORS.primaryBgLight,
                            color: COLORS.primary,
                        }}
                    >
                        목업 데이터
                    </span>
                    <span
                        className="text-sm"
                        style={{ color: COLORS.textSecondary }}
                    >
                        {visiblePosts.length} / {filteredPosts.length}건
                    </span>
                </div>
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="검색해보세요."
                />
            </div>

            {/* 카테고리 탭 */}
            <CategoryTabs
                tabs={categories}
                value={category}
                onChange={handleCategoryChange}
            />

            {/* 컨트롤 바 */}
            <div className="flex justify-end items-center my-4">
                <Select
                    options={sortOptions}
                    value={`${sortField}-${sortOrder}`}
                    onChange={handleSortChange}
                />
            </div>

            {/* 테이블 */}
            <PostTable
                posts={visiblePosts}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNext}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default MockPostsPage;