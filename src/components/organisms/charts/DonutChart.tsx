"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { ApexChart } from "@/components/atoms/ChartWrapper";
import { ApexOptions } from "apexcharts";
import { CHART_COLORS } from "@/styles/theme";
import { ChartColorPicker } from "./ChartColorPicker";
import { useMobile } from "@/hooks/useMobile";
import { Typography } from "@/components/atoms/Typography";

interface DonutChartPropsType {
    title: string;
    labels: string[];
    data: number[];
}

export const DonutChart = ({ title, labels, data }: DonutChartPropsType) => {
    const isMobile = useMobile();
    const [colors, setColors] = useState<string[]>([...CHART_COLORS].slice(0, data.length));

    const options: ApexOptions = {
        chart: {
            type: "donut",
        },
        title: {
            text: isMobile ? "" : title,
            align: "center",
        },
        labels,
        colors,
        legend: {
            show: true,
            position: "bottom",
            height: isMobile ? 50 : undefined,
            onItemClick: {
                toggleDataSeries: true,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: isMobile ? "60%" : "65%",
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
        },
    };

    return (
        <Box sx={{ minHeight: isMobile ? "auto" : 403 }}>
            {isMobile && (
                <Typography
                    variant="h6"
                    className="text-center mb-2"
                >
                    {title}
                </Typography>
            )}
            <ChartColorPicker colors={colors} onChange={setColors} />
            <ApexChart
                type="donut"
                options={options}
                series={data}
                height={isMobile ? 380 : 350}
            />
        </Box>
    );
};