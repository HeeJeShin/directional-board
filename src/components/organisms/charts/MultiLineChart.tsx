"use client";

import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";

interface MultiLineChartProps {
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
    yAxisTitle?: string;
}

export function MultiLineChart({ title, categories, series, yAxisTitle }: MultiLineChartProps) {
    const options: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: true },
            zoom: { enabled: true },
        },
        title: {
            text: title,
            align: "center",
        },
        xaxis: {
            categories,
        },
        yaxis: {
            title: {
                text: yAxisTitle,
            },
        },
        colors: [...CHART_COLORS],
        stroke: {
            curve: "smooth",
            width: 2,
        },
        markers: {
            size: 4,
        },
        legend: {
            position: "bottom",
        },
    };

    return <ApexChart type="line" options={options} series={series} height={350} />;
}