import { CategoryType } from "@/types/post.types";

const categoryStyles: Record<CategoryType, string> = {
    NOTICE: "bg-red-100 text-red-700 border-red-300",
    QNA: "bg-blue-100 text-blue-700 border-blue-300",
    FREE: "bg-green-100 text-green-700 border-green-300",
};

const categoryLabels: Record<CategoryType, string> = {
    NOTICE: "NOTICE",
    QNA: "Q&A",
    FREE: "FREE",
};

interface TagProps {
    category: CategoryType;
}

export function Tag({ category }: TagProps) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${categoryStyles[category]}`}
        >
            {categoryLabels[category]}
        </span>
    );
}