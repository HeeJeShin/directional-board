"use client";

import { useEffect, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    VisibilityState,
} from "@tanstack/react-table";
import { useInView } from "react-intersection-observer";
import { PostType, CategoryType } from "@/types/post.types";
import { COLORS } from "@/styles/theme";
import { useMobile } from "@/hooks/useMobile";
import { MobilePostCard } from "@/components/molecules/MobilePostCard";

// 카테고리 스타일
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

const CategoryTag = ({ category }: { category: CategoryType }) => {
    const style = categoryStyles[category];
    return (
        <span
            style={{
                backgroundColor: style.bg,
                color: style.text,
                borderColor: style.border,
            }}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
        >
            {categoryLabels[category]}
        </span>
    );
};

// 해시태그 컴포넌트
const HashTags = ({ tags }: { tags: string[] }) => {
    if (!tags || tags.length === 0) return <span style={{ color: COLORS.textSecondary }}>-</span>;

    return (
        <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
                <span
                    key={tag}
                    style={{
                        backgroundColor: COLORS.primaryBgLight,
                        color: COLORS.primary,
                        borderColor: COLORS.borderLight,
                    }}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                >
                    #{tag}
                </span>
            ))}
            {tags.length > 3 && (
                <span
                    style={{ color: COLORS.textSecondary }}
                    className="text-xs self-center"
                >
                    +{tags.length - 3}
                </span>
            )}
        </div>
    );
};

// 날짜 포맷 (시간 포함)
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

interface PostTableProps {
    posts: PostType[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
    onRowClick?: (post: PostType) => void;
}

export const PostTable = ({
                              posts,
                              isLoading,
                              hasNextPage,
                              fetchNextPage,
                              isFetchingNextPage,
                              onRowClick,
                          }: PostTableProps) => {
    const { ref, inView } = useInView();
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnSizing, setColumnSizing] = useState({});
    const isMobile = useMobile();

    // 무한스크롤
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 컬럼 정의 (퍼센트 기반)
    const columns = useMemo<ColumnDef<PostType>[]>(
        () => [
            {
                id: "category",
                accessorKey: "category",
                header: "카테고리",
                size: 12,
                minSize: 10,
                maxSize: 15,
                cell: ({ getValue }) => (
                    <CategoryTag category={getValue<CategoryType>()} />
                ),
            },
            {
                id: "title",
                accessorKey: "title",
                header: "제목",
                size: 45,
                minSize: 30,
                maxSize: 60,
                cell: ({ getValue }) => (
                    <span className="truncate block" style={{ color: COLORS.text }}>
                        {getValue<string>()}
                    </span>
                ),
            },
            {
                id: "tags",
                accessorKey: "tags",
                header: "태그",
                size: 25,
                minSize: 15,
                maxSize: 35,
                cell: ({ getValue }) => <HashTags tags={getValue<string[]>()} />,
            },
            {
                id: "createdAt",
                accessorKey: "createdAt",
                header: "작성일",
                size: 18,
                minSize: 15,
                maxSize: 25,
                cell: ({ getValue }) => (
                    <span
                        className="text-xs whitespace-nowrap"
                        style={{ color: COLORS.textSecondary }}
                    >
                        {formatDate(getValue<string>())}
                    </span>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: posts,
        columns,
        state: {
            columnVisibility,
            columnSizing,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnSizingChange: setColumnSizing,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        enableColumnResizing: true,
    });

    // 로딩 스피너
    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2"
                    style={{ borderColor: COLORS.primary }}
                />
            </div>
        );
    }

    // 빈 상태
    if (posts.length === 0) {
        return (
            <div
                className="flex justify-center p-8"
                style={{ color: COLORS.textSecondary }}
            >
                게시글이 없습니다
            </div>
        );
    }

    // 모바일 레이아웃
    if (isMobile) {
        return (
            <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: COLORS.borderLight }}
            >
                {posts.map((post) => (
                    <MobilePostCard
                        key={post.id}
                        post={post}
                        onClick={onRowClick ? () => onRowClick(post) : undefined}
                    />
                ))}

                {/* 무한스크롤 트리거 */}
                <div ref={ref} className="flex justify-center p-4">
                    {isFetchingNextPage && (
                        <div
                            className="animate-spin rounded-full h-6 w-6 border-b-2"
                            style={{ borderColor: COLORS.primary }}
                        />
                    )}
                </div>
            </div>
        );
    }

    // 데스크탑 레이아웃
    return (
        <div className="space-y-3">
            {/* 컬럼 숨김/보임 컨트롤 */}
            <div
                className="flex items-center gap-4 p-3 rounded-lg border"
                style={{ borderColor: COLORS.borderLight }}
            >
                <span
                    className="text-sm font-medium"
                    style={{ color: COLORS.text }}
                >
                    필터:
                </span>
                <div className="flex gap-3 flex-wrap">
                    {table.getAllLeafColumns().map((column) => (
                        <label
                            key={column.id}
                            className="flex items-center gap-1.5 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()}
                                className="w-4 h-4 rounded"
                                style={{
                                    accentColor: COLORS.primary,
                                }}
                            />
                            <span
                                className="text-sm"
                                style={{ color: COLORS.textSecondary }}
                            >
                                {column.columnDef.header as string}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 테이블 */}
            <div
                className="rounded-xl border overflow-auto"
                style={{
                    borderColor: COLORS.borderLight,
                    maxHeight: "70vh",
                }}
            >
                <table className="w-full table-fixed">
                    <thead
                        className="sticky top-0 z-10"
                        style={{ backgroundColor: COLORS.background }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                style={{ borderBottom: `2px solid ${COLORS.primaryLight}` }}
                            >
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="relative px-4 py-3 text-left text-sm font-semibold"
                                        style={{
                                            width: `${header.getSize()}%`,
                                            color: COLORS.primary,
                                            backgroundColor: COLORS.background,
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        {/* 리사이즈 핸들 */}
                                        {header.column.getCanResize() && (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none"
                                                style={{
                                                    backgroundColor: header.column.getIsResizing()
                                                        ? COLORS.primary
                                                        : COLORS.borderLight,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = COLORS.primaryLight;
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!header.column.getIsResizing()) {
                                                        e.currentTarget.style.backgroundColor = COLORS.borderLight;
                                                    }
                                                }}
                                            />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody style={{ backgroundColor: COLORS.background }}>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick?.(row.original)}
                                className={onRowClick ? "cursor-pointer transition-colors" : ""}
                                style={{
                                    borderBottom: `1px solid ${COLORS.borderLight}`,
                                }}
                                onMouseEnter={(e) => {
                                    if (onRowClick) {
                                        e.currentTarget.style.backgroundColor = COLORS.primaryBgLight;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = COLORS.background;
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 text-sm"
                                        style={{ width: `${cell.column.getSize()}%` }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 무한스크롤 트리거 */}
                <div ref={ref} className="flex justify-center p-4">
                    {isFetchingNextPage && (
                        <div
                            className="animate-spin rounded-full h-6 w-6 border-b-2"
                            style={{ borderColor: COLORS.primary }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};