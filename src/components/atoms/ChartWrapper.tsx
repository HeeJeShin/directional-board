"use client";

import dynamic from "next/dynamic";
import { Box, CircularProgress } from "@mui/material";
import {COLORS} from "@/styles/theme";

const ApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => (
        <Box className="flex items-center justify-center h-[350px]">
          <CircularProgress sx={{ color: COLORS.primary}} />
        </Box>
    ),
});

export { ApexChart };