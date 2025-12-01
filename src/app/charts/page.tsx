"use client";

import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import {
    BarChart,
    DonutChart,
    StackedBarChart,
    AreaChart,
    DualAxisLineChart,
} from "@/components/organisms/charts";

import { COLORS, CHART_COLORS } from "@/styles/theme";
import {
    useCoffeeConsumption,
    usePopularSnackBrands,
    useSnackImpact,
    useWeeklyMoodTrend,
    useWeeklyWorkoutTrend
} from "@/hooks/useChart";

export default function ChartsPage() {
    const { data: snackBrands, isLoading: isLoadingSnack } = usePopularSnackBrands();
    const { data: moodTrend, isLoading: isLoadingMood } = useWeeklyMoodTrend();
    const { data: workoutTrend, isLoading: isLoadingWorkout } = useWeeklyWorkoutTrend();
    const { data: coffeeConsumption, isLoading: isLoadingConsumption } = useCoffeeConsumption();
    const { data: snackImpact, isLoading: isLoadingImpact } = useSnackImpact();

    const isLoading =
        isLoadingSnack ||
        isLoadingMood ||
        isLoadingWorkout ||
        isLoadingConsumption ||
        isLoadingImpact;

    if (isLoading) {
        return (
            <Box className="min-h-screen flex items-center justify-center">
                <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
        );
    }

    // 멀티라인 차트용 데이터 변환 - coffeeConsumption
    const coffeeTeams = coffeeConsumption?.teams?.map((team, index) => ({
        name: team.team,
        color: CHART_COLORS[index % CHART_COLORS.length],
        xValues: team.series?.map((m) => m.cups) ?? [],
        primaryData: team.series?.map((m) => m.bugs) ?? [],
        secondaryData: team.series?.map((m) => m.productivity) ?? [],
    })) ?? [];

    // 멀티라인 차트용 데이터 변환 - snackImpact
    const snackDepartments = snackImpact?.departments?.map((dept, index) => ({
        name: dept.name,
        color: CHART_COLORS[index % CHART_COLORS.length],
        xValues: dept.metrics?.map((m) => m.snacks) ?? [],
        primaryData: dept.metrics?.map((m) => m.meetingsMissed) ?? [],
        secondaryData: dept.metrics?.map((m) => m.morale) ?? [],
    })) ?? [];

    return (
        <Box className="p-8">
            <Typography variant="h5" className="font-bold mb-6">
            </Typography>

            <Grid container spacing={3}>
                {/* (1) 바/도넛 차트 - 무드 트렌드 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <BarChart
                            title="Weekly Mood (Bar)"
                            categories={["Happy", "Tired", "Stressed"]}
                            data={[
                                moodTrend?.reduce((sum, item) => sum + item.happy, 0) ?? 0,
                                moodTrend?.reduce((sum, item) => sum + item.tired, 0) ?? 0,
                                moodTrend?.reduce((sum, item) => sum + item.stressed, 0) ?? 0,
                            ]}
                        />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <DonutChart
                            title="Weekly Mood (Donut)"
                            labels={["Happy", "Tired", "Stressed"]}
                            data={[
                                moodTrend?.reduce((sum, item) => sum + item.happy, 0) ?? 0,
                                moodTrend?.reduce((sum, item) => sum + item.tired, 0) ?? 0,
                                moodTrend?.reduce((sum, item) => sum + item.stressed, 0) ?? 0,
                            ]}
                        />
                    </Paper>
                </Grid>

                {/* (1) 바/도넛 차트 - 간식 브랜드 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <BarChart
                            title="Popular Snack Brands (Bar)"
                            categories={snackBrands?.map((item) => item.name) ?? []}
                            data={snackBrands?.map((item) => item.share) ?? []}
                        />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <DonutChart
                            title="Popular Snack Brands (Donut)"
                            labels={snackBrands?.map((item) => item.name) ?? []}
                            data={snackBrands?.map((item) => item.share) ?? []}
                        />
                    </Paper>
                </Grid>

                {/* (2) 스택형 바/면적 차트 - 무드 트렌드 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <StackedBarChart
                            title="Weekly Mood Trend (Stacked Bar %)"
                            categories={moodTrend?.map((item) => item.week) ?? []}
                            series={[
                                { name: "Happy", data: moodTrend?.map((item) => item.happy) ?? [] },
                                { name: "Tired", data: moodTrend?.map((item) => item.tired) ?? [] },
                                { name: "Stressed", data: moodTrend?.map((item) => item.stressed) ?? [] },
                            ]}
                        />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <AreaChart
                            title="Weekly Mood Trend (Area %)"
                            categories={moodTrend?.map((item) => item.week) ?? []}
                            series={[
                                { name: "Happy", data: moodTrend?.map((item) => item.happy) ?? [] },
                                { name: "Tired", data: moodTrend?.map((item) => item.tired) ?? [] },
                                { name: "Stressed", data: moodTrend?.map((item) => item.stressed) ?? [] },
                            ]}
                        />
                    </Paper>
                </Grid>

                {/* (2) 스택형 바/면적 차트 - 운동 트렌드 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <StackedBarChart
                            title="Weekly Workout Trend (Stacked Bar %)"
                            categories={workoutTrend?.map((item) => item.week) ?? []}
                            series={[
                                { name: "Running", data: workoutTrend?.map((item) => item.running) ?? [] },
                                { name: "Cycling", data: workoutTrend?.map((item) => item.cycling) ?? [] },
                                { name: "Stretching", data: workoutTrend?.map((item) => item.stretching) ?? [] },
                            ]}
                        />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper className="p-4">
                        <AreaChart
                            title="Weekly Workout Trend (Area %)"
                            categories={workoutTrend?.map((item) => item.week) ?? []}
                            series={[
                                { name: "Running", data: workoutTrend?.map((item) => item.running) ?? [] },
                                { name: "Cycling", data: workoutTrend?.map((item) => item.cycling) ?? [] },
                                { name: "Stretching", data: workoutTrend?.map((item) => item.stretching) ?? [] },
                            ]}
                        />
                    </Paper>
                </Grid>

                {/* (3) 멀티라인 차트 - 커피 소비 */}
                <Grid size={{ xs: 12 }}>
                    <Paper className="p-4">
                        <DualAxisLineChart
                            title="Coffee Consumption Analysis"
                            xAxisTitle="Cups per Day"
                            leftYAxisTitle="Bugs"
                            rightYAxisTitle="Productivity"
                            primaryLabel="Bugs"
                            secondaryLabel="Productivity"
                            teams={coffeeTeams}
                        />
                    </Paper>
                </Grid>

                {/* (3) 멀티라인 차트 - 간식 영향 */}
                <Grid size={{ xs: 12 }}>
                    <Paper className="p-4">
                        <DualAxisLineChart
                            title="Snack Impact Analysis"
                            xAxisTitle="Snacks"
                            leftYAxisTitle="Meetings Missed"
                            rightYAxisTitle="Morale"
                            primaryLabel="Meetings Missed"
                            secondaryLabel="Morale"
                            teams={snackDepartments}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}