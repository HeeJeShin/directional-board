import { PostType, CategoryType } from "@/types/post.types";
import { COLORS } from "@/styles/theme";

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

const HashTags = ({ tags }: { tags: string[] }) => {
    if (!tags || tags.length === 0) return null;

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

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

interface MobilePostCardProps {
    post: PostType;
    onClick?: () => void;
}

export const MobilePostCard = ({ post, onClick }: MobilePostCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 border-b last:border-b-0 ${onClick ? "cursor-pointer active:bg-gray-50" : ""}`}
            style={{ borderColor: COLORS.borderLight }}
        >
            {/* 상단: 카테고리 + 날짜 */}
            <div className="flex items-center justify-between mb-2">
                <CategoryTag category={post.category} />
                <span className="text-xs" style={{ color: COLORS.textSecondary }}>
                    {formatDate(post.createdAt)}
                </span>
            </div>

            {/* 제목 */}
            <h3
                className="font-medium text-sm mb-2 line-clamp-2"
                style={{ color: COLORS.text }}
            >
                {post.title}
            </h3>

            {/* 태그 */}
            {post.tags && post.tags.length > 0 && (
                <HashTags tags={post.tags} />
            )}
        </div>
    );
};