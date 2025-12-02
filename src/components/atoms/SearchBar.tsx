"use client";

import { useState } from "react";
import { Input } from "@/components/atoms/Input";
import { COLORS } from "@/styles/theme";

interface SearchBarProps {
    onSearch: (value: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "검색어 입력" }: SearchBarProps) => {
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

    const SearchButtons = (
        <>
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded-full transition-colors duration-200 hover:bg-gray-100"
                    style={{ color: COLORS.textSecondary }}
                >
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
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
            <button
                type="button"
                onClick={handleSearch}
                className="p-1 rounded-full transition-colors duration-200 hover:bg-gray-100"
                style={{ color: COLORS.textSecondary }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
        </>
    );

    return (
        <div className="w-72">
            <Input
                variant="rounded"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                endAdornment={SearchButtons}
            />
        </div>
    );
};