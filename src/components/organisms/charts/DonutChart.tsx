"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";

interface DonutChartProps {
    title: string;
    labels: string[];
    data: number[];
}

export function DonutChart({ title, labels, data }: DonutChartProps) {
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, data.length));

    const options: ApexOptions = {
        chart: {
            type: "donut",
        },
        title: {
            text: title,
            align: "center",
        },
        labels,
        colors,
        legend: {
            show: true,
            position: "bottom",
            onItemClick: {
                toggleDataSeries: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
        },
    };

    return (
        <Box>
      <ChartColorPicker colors={colors} onChange={setColors} />
      <ApexChart type="donut" options={options} series={data} height={350} />
    </Box>
    );
}