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

// 바/도넛 차트용
export const useTopCoffeeBrands = () => {
    return useQuery({
        queryKey: ["topCoffeeBrands"],
        queryFn: () => api.get(ENDPOINTS.TOP_COFFEE_BRANDS).json<TopCoffeeBrandsResponseType>(),
    });
};

export const usePopularSnackBrands = () => {
    return useQuery({
        queryKey: ["popularSnackBrands"],
        queryFn: () => api.get(ENDPOINTS.POPULAR_SNACK_BRANDS).json<PopularSnackBrandsResponseType>(),
    });
};

// 스택형 바/면적 차트용
export const useWeeklyMoodTrend = () => {
    return useQuery({
        queryKey: ["weeklyMoodTrend"],
        queryFn: () => api.get(ENDPOINTS.WEEKLY_MOOD_TREND).json<WeeklyMoodTrendResponseType>(),
    });
};

export const useWeeklyWorkoutTrend = () => {
    return useQuery({
        queryKey: ["weeklyWorkoutTrend"],
        queryFn: () => api.get(ENDPOINTS.WEEKLY_WORKOUT_TREND).json<WeeklyWorkoutTrendResponseType>(),
    });
};

// 멀티라인 차트용
export const useCoffeeConsumption = () => {
    return useQuery({
        queryKey: ["coffeeConsumption"],
        queryFn: () => api.get(ENDPOINTS.COFFEE_CONSUMPTION).json<CoffeeConsumptionResponseType>(),
    });
};

export const useSnackImpact = () => {
    return useQuery({
        queryKey: ["snackImpact"],
        queryFn: () => api.get(ENDPOINTS.SNACK_IMPACT).json<SnackImpactResponseType>(),
    });
};