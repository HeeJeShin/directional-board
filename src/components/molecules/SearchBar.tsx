"use client";

import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
    onSearch: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "검색어 입력" }: SearchBarProps) {
    const [value, setValue] = useState("");

    const handleSearch = () => {
        onSearch(value);
    };

    const handleClear = () => {
        setValue("");
        onSearch("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <TextField
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
            {value && (
                <IconButton size="small" onClick={handleClear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
                        <IconButton size="small" onClick={handleSearch}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
                ),
            }}
        />
    );
}