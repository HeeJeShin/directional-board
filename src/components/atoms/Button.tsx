import { ButtonHTMLAttributes, ReactNode } from "react";
import { COLORS } from "@/styles/theme";

type VariantType = "contained" | "outlined" | "text";
type SizeType = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: VariantType;
    size?: SizeType;
    loading?: boolean;
    startIcon?: ReactNode;
    children: ReactNode;
}

const sizeStyles: Record<SizeType, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};

export const Button = ({
                           variant = "contained",
                           size = "md",
                           loading = false,
                           startIcon,
                           children,
                           disabled,
                           className = "",
                           style,
                           ...props
                       }: ButtonProps) => {
    const isDisabled = disabled || loading;

    const baseStyles = `
        inline-flex items-center justify-center gap-2 
        font-medium rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles: Record<VariantType, React.CSSProperties> = {
        contained: {
            backgroundColor: isDisabled ? COLORS.textSecondary : COLORS.primary,
            color: COLORS.white,
        },
        outlined: {
            backgroundColor: "transparent",
            color: COLORS.primary,
            border: `1px solid ${COLORS.primary}`,
        },
        text: {
            backgroundColor: "transparent",
            color: COLORS.primary,
        },
    };

    const hoverClass: Record<VariantType, string> = {
        contained: "hover:opacity-90 active:opacity-80",
        outlined: "hover:bg-[#1C4E4E10] active:bg-[#1C4E4E20]",
        text: "hover:bg-[#1C4E4E10] active:bg-[#1C4E4E20]",
    };

    return (
        <button
            disabled={isDisabled}
            className={`${baseStyles} ${sizeStyles[size]} ${hoverClass[variant]} ${className}`}
            style={{ ...variantStyles[variant], ...style }}
            {...props}
        >
            {loading ? (
                <div
                    className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"
                />
            ) : (
                <>
                    {startIcon}
                    {children}
                </>
            )}
        </button>
    );
};