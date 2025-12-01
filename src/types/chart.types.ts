// ========== 바/도넛 차트 ==========
export interface TopCoffeeBrandItemType {
    brand: string;
    count: number;
}

export interface TopCoffeeBrandsResponseType {
    data: TopCoffeeBrandItemType[];
}

export interface PopularSnackBrandItemType {
    brand: string;
    count: number;
}

export interface PopularSnackBrandsResponseType {
    data: PopularSnackBrandItemType[];
}

// ========== 스택형 바/면적 차트 ==========
export interface WeeklyMoodItemType {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
}

export interface WeeklyMoodTrendResponseType {
    data: WeeklyMoodItemType[];
}

export interface WeeklyWorkoutItemType {
    week: string;
    running: number;
    cycling: number;
    stretching: number;
}

export interface WeeklyWorkoutTrendResponseType {
    data: WeeklyWorkoutItemType[];
}

// ========== 멀티라인 차트 ==========
export interface CoffeeDataPointType {
    cupsPerDay: number;
    bugs: number;
    productivity: number;
}

export interface CoffeeTeamType {
    team: string;
    data: CoffeeDataPointType[];
}

export interface CoffeeConsumptionResponseType {
    teams: CoffeeTeamType[];
}

export interface SnackImpactDataPointType {
    snackCount: number;
    meetingMissed: number;
    morale: number;
}

export interface SnackImpactDepartmentType {
    department: string;
    data: SnackImpactDataPointType[];
}

export interface SnackImpactResponseType {
    departments: SnackImpactDepartmentType[];
}