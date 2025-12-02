import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import type {
    TopCoffeeBrandsResponseType,
    PopularSnackBrandsResponseType,
    WeeklyMoodTrendResponseType,
    WeeklyWorkoutTrendResponseType,
    CoffeeConsumptionResponseType,
    SnackImpactResponseType,
} from "@/types/chart.types";

// 차트 데이터 캐시 설정 (5분간 fresh 상태 유지)
const CHART_QUERY_OPTIONS = {
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000,   // 10분 (가비지 컬렉션)
} as const;

// 바/도넛 차트용
export const useTopCoffeeBrands = () => {
    return useQuery({
        queryKey: ["topCoffeeBrands"],
        queryFn: () => api.get(ENDPOINTS.TOP_COFFEE_BRANDS).json<TopCoffeeBrandsResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};

export const usePopularSnackBrands = () => {
    return useQuery({
        queryKey: ["popularSnackBrands"],
        queryFn: () => api.get(ENDPOINTS.POPULAR_SNACK_BRANDS).json<PopularSnackBrandsResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};

// 스택형 바/면적 차트용
export const useWeeklyMoodTrend = () => {
    return useQuery({
        queryKey: ["weeklyMoodTrend"],
        queryFn: () => api.get(ENDPOINTS.WEEKLY_MOOD_TREND).json<WeeklyMoodTrendResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};

export const useWeeklyWorkoutTrend = () => {
    return useQuery({
        queryKey: ["weeklyWorkoutTrend"],
        queryFn: () => api.get(ENDPOINTS.WEEKLY_WORKOUT_TREND).json<WeeklyWorkoutTrendResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};

// 멀티라인 차트용
export const useCoffeeConsumption = () => {
    return useQuery({
        queryKey: ["coffeeConsumption"],
        queryFn: () => api.get(ENDPOINTS.COFFEE_CONSUMPTION).json<CoffeeConsumptionResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};

export const useSnackImpact = () => {
    return useQuery({
        queryKey: ["snackImpact"],
        queryFn: () => api.get(ENDPOINTS.SNACK_IMPACT).json<SnackImpactResponseType>(),
        ...CHART_QUERY_OPTIONS,
    });
};