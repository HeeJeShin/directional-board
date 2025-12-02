import { forwardRef, SelectHTMLAttributes } from "react";
import { COLORS } from "@/styles/theme";

interface OptionType {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: OptionType[];
    error?: boolean;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, placeholder, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label
                        className="text-sm font-medium"
                        style={{ color: COLORS.textSecondary }}
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
                        px-4 py-2 rounded-lg border text-sm 
                        transition-all duration-200 cursor-pointer
                        focus:outline-none focus:ring-2
                        hover:border-[${COLORS.primary}]
                        ${className}
                    `}
                    style={{
                        borderColor: error ? "#EF4444" : COLORS.border,
                        color: COLORS.text,
                    }}
                    {...props}
                >
                    {placeholder && (
                        <option value="">{placeholder}</option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

Select.displayName = "Select";