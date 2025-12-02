import { ElementType, HTMLAttributes, ReactNode } from "react";

type VariantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption";

interface TypographyPropsType extends HTMLAttributes<HTMLElement> {
    variant?: VariantType;
    children?: ReactNode;
    as?: ElementType;
}

const variantStyles: Record<VariantType, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
    body1: "text-base",
    body2: "text-sm",
    caption: "text-xs text-gray-500",
};

const variantTags: Record<VariantType, ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body1: "p",
    body2: "p",
    caption: "span",
};

export const Typography = ({
                               variant = "body1",
                               children,
                               className = "",
                               as,
                               ...props
                           }: TypographyPropsType) => {
    const Component = as || variantTags[variant];
    const baseStyle = variantStyles[variant];

    return (
        <Component
            className={`${baseStyle} ${className}`}
            style={{
                wordBreak: "break-word",
                overflowWrap: "anywhere",
            }}
            {...props}
        >
            {children}
        </Component>
    );
};