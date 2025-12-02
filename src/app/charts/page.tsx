"use client";

import { useMemo } from "react";
import { Box, Typography, Paper, Grid, Skeleton } from "@mui/material";
import {
    BarChart,
    DonutChart,
    StackedBarChart,
    AreaChart,
    DualAxisLineChart,
} from "@/components/organisms/charts";

import { CHART_COLORS } from "@/styles/theme";
import {
    useCoffeeConsumption,
    usePopularSnackBrands,
    useSnackImpact,
    useWeeklyMoodTrend,
    useWeeklyWorkoutTrend
} from "@/hooks/useChart";

// 차트 스켈레톤 컴포넌트
function ChartSkeleton({ height = 300 }: { height?: number }) {
    return (
        <Paper className="p-4">
            <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={height} />
        </Paper>
    );
}

// 무드 트렌드 바/도넛 차트 섹션
function MoodBarDonutSection() {
    const { data: moodTrend, isLoading } = useWeeklyMoodTrend();

    const moodData = useMemo(() => {
        if (!moodTrend) return { categories: ["Happy", "Tired", "Stressed"], data: [0, 0, 0] };
        return {
            categories: ["Happy", "Tired", "Stressed"],
            data: [
                moodTrend.reduce((sum, item) => sum + item.happy, 0),
                moodTrend.reduce((sum, item) => sum + item.tired, 0),
                moodTrend.reduce((sum, item) => sum + item.stressed, 0),
            ],
        };
    }, [moodTrend]);

    if (isLoading) {
        return (
            <>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
            </>
        );
    }

    return (
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <BarChart
                        title="Weekly Mood (Bar)"
                        categories={moodData.categories}
                        data={moodData.data}
                    />
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <DonutChart
                        title="Weekly Mood (Donut)"
                        labels={moodData.categories}
                        data={moodData.data}
                    />
                </Paper>
            </Grid>
        </>
    );
}

// 스낵 브랜드 바/도넛 차트 섹션
function SnackBarDonutSection() {
    const { data: snackBrands, isLoading } = usePopularSnackBrands();

    const snackData = useMemo(() => {
        if (!snackBrands) return { categories: [], data: [] };
        return {
            categories: snackBrands.map((item) => item.name),
            data: snackBrands.map((item) => item.share),
        };
    }, [snackBrands]);

    if (isLoading) {
        return (
            <>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
            </>
        );
    }

    return (
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <BarChart
                        title="Popular Snack Brands (Bar)"
                        categories={snackData.categories}
                        data={snackData.data}
                    />
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <DonutChart
                        title="Popular Snack Brands (Donut)"
                        labels={snackData.categories}
                        data={snackData.data}
                    />
                </Paper>
            </Grid>
        </>
    );
}

// 무드 트렌드 스택형 차트 섹션
function MoodStackedSection() {
    const { data: moodTrend, isLoading } = useWeeklyMoodTrend();

    const stackedData = useMemo(() => {
        if (!moodTrend) return { categories: [], series: [] };
        return {
            categories: moodTrend.map((item) => item.week),
            series: [
                { name: "Happy", data: moodTrend.map((item) => item.happy) },
                { name: "Tired", data: moodTrend.map((item) => item.tired) },
                { name: "Stressed", data: moodTrend.map((item) => item.stressed) },
            ],
        };
    }, [moodTrend]);

    if (isLoading) {
        return (
            <>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
            </>
        );
    }

    return (
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <StackedBarChart
                        title="Weekly Mood Trend (Stacked Bar %)"
                        categories={stackedData.categories}
                        series={stackedData.series}
                    />
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <AreaChart
                        title="Weekly Mood Trend (Area %)"
                        categories={stackedData.categories}
                        series={stackedData.series}
                    />
                </Paper>
            </Grid>
        </>
    );
}

// 운동 트렌드 스택형 차트 섹션
function WorkoutStackedSection() {
    const { data: workoutTrend, isLoading } = useWeeklyWorkoutTrend();

    const stackedData = useMemo(() => {
        if (!workoutTrend) return { categories: [], series: [] };
        return {
            categories: workoutTrend.map((item) => item.week),
            series: [
                { name: "Running", data: workoutTrend.map((item) => item.running) },
                { name: "Cycling", data: workoutTrend.map((item) => item.cycling) },
                { name: "Stretching", data: workoutTrend.map((item) => item.stretching) },
            ],
        };
    }, [workoutTrend]);

    if (isLoading) {
        return (
            <>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><ChartSkeleton /></Grid>
            </>
        );
    }

    return (
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <StackedBarChart
                        title="Weekly Workout Trend (Stacked Bar %)"
                        categories={stackedData.categories}
                        series={stackedData.series}
                    />
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper className="p-4">
                    <AreaChart
                        title="Weekly Workout Trend (Area %)"
                        categories={stackedData.categories}
                        series={stackedData.series}
                    />
                </Paper>
            </Grid>
        </>
    );
}

// 커피 소비 분석 차트 섹션
function CoffeeConsumptionSection() {
    const { data: coffeeConsumption, isLoading } = useCoffeeConsumption();

    const coffeeTeams = useMemo(() => {
        if (!coffeeConsumption?.teams) return [];
        return coffeeConsumption.teams.map((team, index) => ({
            name: team.team,
            color: CHART_COLORS[index % CHART_COLORS.length],
            xValues: team.series?.map((m) => m.cups) ?? [],
            primaryData: team.series?.map((m) => m.bugs) ?? [],
            secondaryData: team.series?.map((m) => m.productivity) ?? [],
        }));
    }, [coffeeConsumption]);

    if (isLoading) {
        return (
            <Grid size={{ xs: 12 }}>
                <ChartSkeleton height={400} />
            </Grid>
        );
    }

    return (
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
    );
}

// 스낵 영향 분석 차트 섹션
function SnackImpactSection() {
    const { data: snackImpact, isLoading } = useSnackImpact();

    const snackDepartments = useMemo(() => {
        if (!snackImpact?.departments) return [];
        return snackImpact.departments.map((dept, index) => ({
            name: dept.name,
            color: CHART_COLORS[index % CHART_COLORS.length],
            xValues: dept.metrics?.map((m) => m.snacks) ?? [],
            primaryData: dept.metrics?.map((m) => m.meetingsMissed) ?? [],
            secondaryData: dept.metrics?.map((m) => m.morale) ?? [],
        }));
    }, [snackImpact]);

    if (isLoading) {
        return (
            <Grid size={{ xs: 12 }}>
                <ChartSkeleton height={400} />
            </Grid>
        );
    }

    return (
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
    );
}

export default function ChartsPage() {
    return (
        <Box className="p-8">
            <Typography variant="h5" className="font-bold mb-6">
            </Typography>

            <Grid container spacing={3}>
                {/* (1) 바/도넛 차트 - 무드 트렌드 */}
                <MoodBarDonutSection />

                {/* (1) 바/도넛 차트 - 간식 브랜드 */}
                <SnackBarDonutSection />

                {/* (2) 스택형 바/면적 차트 - 무드 트렌드 */}
                <MoodStackedSection />

                {/* (2) 스택형 바/면적 차트 - 운동 트렌드 */}
                <WorkoutStackedSection />

                {/* (3) 멀티라인 차트 - 커피 소비 */}
                <CoffeeConsumptionSection />

                {/* (3) 멀티라인 차트 - 간식 영향 */}
                <SnackImpactSection />
            </Grid>
        </Box>
    );
}
