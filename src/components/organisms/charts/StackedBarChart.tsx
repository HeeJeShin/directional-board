"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";

interface StackedBarChartProps {
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
}

export function StackedBarChart({ title, categories, series }: StackedBarChartProps) {
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, series.length));

    const options: ApexOptions = {
        chart: {
            type: "bar",
            stacked: true,
            stackType: "100%",
            toolbar: { show: true },
        },
        title: {
            text: title,
            align: "center",
        },
        xaxis: {
            categories,
        },
        yaxis: {
            labels: {
                formatter: (val: number) => `${val.toFixed(0)}%`,
            },
        },
        colors,
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4,
            },
        },
        legend: {
            show: true,
            position: "bottom",
            onItemClick: {
                toggleDataSeries: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val.toFixed(1)}%`,
            },
        },
    };

    return (
        <Box>
      <ChartColorPicker colors={colors} onChange={setColors} />
      <ApexChart type="bar" options={options} series={series} height={350} />
    </Box>
    );
}