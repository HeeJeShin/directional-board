// ========== Auth ==========
export interface LoginRequestType {
    username: string;
    password: string;
}

export interface LoginResponseType {
    user(token: string, user: any): unknown;
    token: string;
}

// ========== Post ==========
export type CategoryType = "NOTICE" | "QNA" | "FREE";

export interface PostType {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: CategoryType;
    tags: string[];
    createdAt: string;
}

export interface CreatePostRequestType {
    title: string;
    body: string;
    category: CategoryType;
    tags?: string[];
}

export interface UpdatePostRequestType {
    title?: string;
    body?: string;
    category?: CategoryType;
    tags?: string[];
}

export interface PostListParamsType {
    search?: string;
    sort?: "title" | "createdAt";
    order?: "asc" | "desc";
    category?: CategoryType;
    cursor?: string;
    limit?: number;
}

export interface PostListResponseType {
    data: PostType[];
    nextCursor?: string;
    hasMore: boolean;
}

// ========== Mock - Chart Data ==========
export interface WeeklyMoodTrendType {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
}

export interface WeeklyWorkoutTrendType {
    week: string;
    running: number;
    cycling: number;
    stretching: number;
}

export interface PopularSnackBrandType {
    brand: string;
    count: number;
}

export interface CoffeeConsumptionType {
    team: string;
    cupsPerDay: number;
    bugs: number;
    productivity: number;
}

export interface SnackImpactType {
    team: string;
    snackCount: number;
    meetingMissed: number;
    morale: number;
}