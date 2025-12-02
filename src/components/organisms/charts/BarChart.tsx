"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";
import { useMobile } from "@/hooks/useMobile";
import { Typography } from "@/components/atoms/Typography";

interface BarChartPropsType {
    title: string;
    categories: string[];
    data: number[];
}

export const BarChart = ({ title, categories, data }: BarChartPropsType) => {
    const isMobile = useMobile();
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, data.length));

    const options: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: true },
        },
        title: {
            text: isMobile ? "" : title,
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
            {isMobile && (
                <Typography
                    variant="h6"
                    className="text-center mb-2"
                >
                    {title}
                </Typography>
            )}
            <ChartColorPicker colors={colors} onChange={setColors} />
            <ApexChart type="bar" options={options} series={series} height={350} />
        </Box>
    );
};