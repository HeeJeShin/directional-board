import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { COLORS } from "@/styles/theme";

type VariantType = "default" | "rounded";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    helperText?: string;
    variant?: VariantType;
    endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, variant = "default", endAdornment, className = "", ...props }, ref) => {
        const variantStyles: Record<VariantType, string> = {
            default: "rounded-md",
            rounded: "rounded-full",
        };

        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label
                        className="text-sm font-medium"
                        style={{ color: COLORS.textSecondary }}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={`
                            w-full px-4 py-2 border text-sm
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-[#1C4E4E50]
                            hover:border-[#1C4E4E]
                            ${variantStyles[variant]}
                            ${endAdornment ? "pr-16" : ""}
                            ${className}
                        `}
                        style={{
                            borderColor: error ? "#EF4444" : COLORS.border,
                            color: COLORS.text,
                        }}
                        {...props}
                    />
                    {endAdornment && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {endAdornment}
                        </div>
                    )}
                </div>
                {helperText && (
                    <span
                        className="text-xs"
                        style={{ color: error ? "#EF4444" : COLORS.textSecondary }}
                    >
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";