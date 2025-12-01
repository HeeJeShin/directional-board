"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import {ToastProvider} from "@/hooks/useToast";

const theme = createTheme({

});

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                   <ToastProvider>{children}</ToastProvider>  {/* ← 감싸기 */}
              </ThemeProvider>
        </QueryClientProvider>
    );
}