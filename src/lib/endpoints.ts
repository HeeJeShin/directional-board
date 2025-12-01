export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
    // Health
    HEALTH: "health",

    // Auth
    LOGIN: "auth/login",

    // Posts
    POSTS: "posts",
    POST_BY_ID: (id: string) => `posts/${id}`,

    // Mock - Posts
    MOCK_POSTS: "mock/posts",

    // Mock - 바/도넛 차트용
    TOP_COFFEE_BRANDS: "mock/top-coffee-brands",
    POPULAR_SNACK_BRANDS: "mock/popular-snack-brands",

    // Mock - 스택형 바/면적 차트용
    WEEKLY_MOOD_TREND: "mock/weekly-mood-trend",
    WEEKLY_WORKOUT_TREND: "mock/weekly-workout-trend",

    // Mock - 멀티라인 차트용
    COFFEE_CONSUMPTION: "mock/coffee-consumption",
    SNACK_IMPACT: "mock/snack-impact",
} as const;