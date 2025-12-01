"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CategoryType } from "@/types/post.types";

interface CategoryFilterProps {
    value: CategoryType | "ALL";
    onChange: (value: CategoryType | "ALL") => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
    const handleChange = (_: React.MouseEvent, newValue: CategoryType | "ALL" | null) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
            size="small"
        >
          <ToggleButton value="ALL">ALL</ToggleButton>
          <ToggleButton value="NOTICE">NOTICE</ToggleButton>
          <ToggleButton value="QNA">QNA</ToggleButton>
          <ToggleButton value="FREE">FREE</ToggleButton>
        </ToggleButtonGroup>
    );
}