"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";
import { useMobile } from "@/hooks/useMobile";

interface TeamDataType {
    name: string;
    xValues: number[];
    primaryData: number[];
    secondaryData: number[];
}

interface DualAxisLineChartPropsType {
    title: string;
    xAxisTitle: string;
    leftYAxisTitle: string;
    rightYAxisTitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    teams: TeamDataType[];
}

export const DualAxisLineChart = ({
                                      title,
                                      xAxisTitle,
                                      leftYAxisTitle,
                                      rightYAxisTitle,
                                      primaryLabel,
                                      secondaryLabel,
                                      teams,
                                  }: DualAxisLineChartPropsType) => {
    const isMobile = useMobile();
    const [colors, setColors] = useState<string[]>(
        [...CHART_COLORS].slice(0, teams.length)
    );

    // 시리즈 생성: 각 팀마다 2개 라인
    const series = teams.flatMap((team) => [
        {
            name: `${team.name} - ${primaryLabel}`,
            type: "line" as const,
            data: team.xValues.map((x, i) => ({ x, y: team.primaryData[i] })),
        },
        {
            name: `${team.name} - ${secondaryLabel}`,
            type: "line" as const,
            data: team.xValues.map((x, i) => ({ x, y: team.secondaryData[i] })),
        },
    ]);

    const seriesColors = teams.flatMap((_, index) => [colors[index], colors[index]]);
    const dashArray = teams.flatMap(() => [0, 5]);

    const options: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: true },
            zoom: { enabled: true },
        },
        title: {
            text: isMobile ? "" : title, // 모바일에서는 외부 Typography로 표시
            align: "center",
        },
        colors: seriesColors,
        stroke: {
            curve: "smooth",
            width: 2,
            dashArray,
        },
        markers: {
            size: 6,
            strokeWidth: 2,
            strokeColors: "#fff",
            discrete: teams.flatMap((team, teamIndex) => [
                ...team.xValues.map((_, i) => ({
                    seriesIndex: teamIndex * 2,
                    dataPointIndex: i,
                    fillColor: colors[teamIndex],
                    strokeColor: "#fff",
                    size: 6,
                    shape: "circle" as const,
                })),
                ...team.xValues.map((_, i) => ({
                    seriesIndex: teamIndex * 2 + 1,
                    dataPointIndex: i,
                    fillColor: colors[teamIndex],
                    strokeColor: "#fff",
                    size: 6,
                    shape: "square" as const,
                })),
            ]),
        },
        xaxis: {
            title: { text: xAxisTitle },
            type: "numeric",
        },
        yaxis: [
            {
                title: {
                    text: leftYAxisTitle,
                    style: { fontSize: "12px", fontWeight: 400 },
                },
                labels: {
                    formatter: (val: number) => val.toFixed(0),
                },
            },
            {
                opposite: true,
                title: {
                    text: rightYAxisTitle,
                    style: { fontSize: "12px", fontWeight: 400 },
                },
                labels: {
                    formatter: (val: number) => val.toFixed(0),
                },
            },
        ],
        grid: {
            padding: { left: 10, right: 10 },
        },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            height: 100,
            itemMargin: {
                horizontal: 12,
                vertical: 1,
            },
            onItemClick: {
                toggleDataSeries: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            shared: false,
            intersect: true,
            custom: ({ seriesIndex, dataPointIndex }) => {
                const teamIndex = Math.floor(seriesIndex / 2);
                const team = teams[teamIndex];
                const xValue = team.xValues[dataPointIndex];
                const primaryVal = team.primaryData[dataPointIndex];
                const secondaryVal = team.secondaryData[dataPointIndex];

                return `
                  <div style="padding: 10px; background: #fff; border: 1px solid ${colors[teamIndex]}; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-weight: 600; color: ${colors[teamIndex]}; margin-bottom: 6px;">${team.name}</div>
                    <div style="font-size: 12px; color: #666;">
                      <div>${xAxisTitle}: <strong>${xValue}</strong></div>
                      <div>● ${primaryLabel}: <strong>${primaryVal}</strong></div>
                      <div>■ ${secondaryLabel}: <strong>${secondaryVal}</strong></div>
                    </div>
                  </div>
                `;
            },
        },
    };

    return (
        <Box
            sx={{
                "& .apexcharts-legend": {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                },
                "& .apexcharts-legend-group": {
                    display: "contents",
                },
                "& .apexcharts-legend-series": {
                    width: "33%",
                    justifyContent: "center",
                },
            }}
        >
            {/* 모바일: 제목을 차트 외부 상단에 배치 */}
            {isMobile && (
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    textAlign="center"
                    mb={1}
                >
                    {title}
                </Typography>
            )}
            <ChartColorPicker colors={colors} onChange={setColors} />
            <ApexChart type="line" options={options} series={series} height={450} />
        </Box>
    );
};