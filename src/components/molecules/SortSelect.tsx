"use client";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SortFieldType, SortOrderType } from "@/types/post.types";

interface SortSelectProps {
    sortField: SortFieldType;
    sortOrder: SortOrderType;
    onSortChange: (field: SortFieldType, order: SortOrderType) => void;
}

export function SortSelect({ sortField, sortOrder, onSortChange }: SortSelectProps) {
    const value = `${sortField}-${sortOrder}`;

    const handleChange = (newValue: string) => {
        const [field, order] = newValue.split("-") as [SortFieldType, SortOrderType];
        onSortChange(field, order);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>정렬</InputLabel>
          <Select
              value={value}
              label="정렬"
              onChange={(e) => handleChange(e.target.value)}
          >
            <MenuItem value="createdAt-desc">최신순</MenuItem>
            <MenuItem value="createdAt-asc">오래된순</MenuItem>
            <MenuItem value="title-asc">제목 오름차순</MenuItem>
            <MenuItem value="title-desc">제목 내림차순</MenuItem>
          </Select>
        </FormControl>
    );
}