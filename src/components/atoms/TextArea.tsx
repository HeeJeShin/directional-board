import { forwardRef, TextareaHTMLAttributes } from "react";
import { COLORS } from "@/styles/theme";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: boolean;
    helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, helperText, className = "", ...props }, ref) => {
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
                <textarea
                    ref={ref}
                    rows={6}
                    className={`
                        w-full px-4 py-3 border rounded-md text-sm resize-none
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#1C4E4E50]
                        hover:border-[#1C4E4E]
                        ${className}
                    `}
                    style={{
                        borderColor: error ? "#EF4444" : COLORS.border,
                        color: COLORS.text,
                    }}
                    {...props}
                />
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

TextArea.displayName = "TextArea";