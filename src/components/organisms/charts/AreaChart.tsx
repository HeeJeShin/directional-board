"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";
import { useMobile } from "@/hooks/useMobile";
import { Typography } from "@/components/atoms/Typography";

interface AreaChartPropsType {
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
}

export const AreaChart = ({ title, categories, series }: AreaChartPropsType) => {
    const isMobile = useMobile();
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, series.length));

    const options: ApexOptions = {
        chart: {
            type: "area",
            stacked: true,
            stackType: "100%",
            toolbar: { show: true },
        },
        title: {
            text: isMobile ? "" : title,
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
        stroke: {
            curve: "smooth",
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.1,
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
            {isMobile && (
                <Typography
                    variant="h6"
                    className="text-center mb-2"
                >
                    {title}
                </Typography>
            )}
            <ChartColorPicker colors={colors} onChange={setColors} />
            <ApexChart type="area" options={options} series={series} height={350} />
        </Box>
    );
};