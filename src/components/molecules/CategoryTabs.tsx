import { COLORS } from "@/styles/theme";

interface TabType {
    value: string;
    label: string;
}

interface CategoryTabsProps {
    tabs: TabType[];
    value: string;
    onChange: (value: string) => void;
}

export const CategoryTabs = ({ tabs, value, onChange }: CategoryTabsProps) => {
    return (
        <div className="flex">
            {tabs.map((tab) => {
                const isActive = value === tab.value;
                return (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        className="px-6 py-3 text-sm font-medium transition-all duration-200 relative hover:bg-[#1C4E4E08]"
                        style={{
                            color: isActive ? COLORS.primary : COLORS.textSecondary,
                        }}
                    >
                        {tab.label}
                        {isActive && (
                            <span
                                className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200"
                                style={{ backgroundColor: COLORS.primary }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};