import { forwardRef } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">{label}</label>
                <select
                    ref={ref}
                    className={`
                    w-full px-3 py-2 border rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${className ?? ""}
                  `}
                    {...props}
                >
                  <option value="">선택해주세요</option>
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