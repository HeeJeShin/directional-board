// ========== 바/도넛 차트 - 커피 브랜드 ==========
export interface TopCoffeeBrandItemType {
    brand: string;
    popularity: number;
}

export type TopCoffeeBrandsResponseType = TopCoffeeBrandItemType[];

// ========== 바/도넛 차트 - 간식 브랜드 ==========
export interface PopularSnackBrandItemType {
    name: string;
    share: number;
}

export type PopularSnackBrandsResponseType = PopularSnackBrandItemType[];

// ========== 스택형 바/면적 차트 - 무드 트렌드 ==========
export interface WeeklyMoodItemType {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
}

export type WeeklyMoodTrendResponseType = WeeklyMoodItemType[];

// ========== 스택형 바/면적 차트 - 운동 트렌드 ==========
export interface WeeklyWorkoutItemType {
    week: string;
    running: number;
    cycling: number;
    stretching: number;
}

export type WeeklyWorkoutTrendResponseType = WeeklyWorkoutItemType[];

// ========== 멀티라인 차트 - 커피 소비 ==========
export interface CoffeeMetricType {
    cups: number;
    bugs: number;
    productivity: number;
}

export interface CoffeeTeamType {
    series : CoffeeMetricType[]
    team : string;
}

export interface CoffeeConsumptionResponseType {
    teams: CoffeeTeamType[];
}

// ========== 멀티라인 차트 - 간식 영향 ==========
export interface SnackMetricType {
    snacks: number;
    meetingsMissed: number;
    morale: number;
}

export interface SnackDepartmentType {
    name: string;
    metrics: SnackMetricType[];
}

export interface SnackImpactResponseType {
    departments: SnackDepartmentType[];
}