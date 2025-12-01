"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";

interface BarChartProps {
    title: string;
    categories: string[];
    data: number[];
}

export function BarChart({ title, categories, data }: BarChartProps) {
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, data.length));

    const options: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: true },
        },
        title: {
            text: title,
            align: "center",
        },
        xaxis: {
            categories,
        },
        colors,
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                distributed: true,
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
    };

    const series = [
        {
            name: "Value",
            data,
        },
    ];

    return (
        <Box>
      <ChartColorPicker colors={colors} onChange={setColors} />
      <ApexChart type="bar" options={options} series={series} height={350} />
    </Box>
    );
}