import { Chip, ChipProps } from "@mui/material";
import { CategoryType } from "@/types/post.types";

const categoryColors: Record<CategoryType, ChipProps["color"]> = {
    NOTICE: "error",
    QNA: "primary",
    FREE: "success",
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
        <Chip
            label={categoryLabels[category]}
            color={categoryColors[category]}
            size="small"
        />
    );
}