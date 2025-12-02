"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import {COLORS} from "@/styles/theme";

type ToastSeverity = "success" | "error" | "warning" | "info";

interface ToastContextType {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState({
        open: false,
        message: "",
        severity: "info" as ToastSeverity,
    });

    const showToast = useCallback((message: string, severity: ToastSeverity) => {
        setState({ open: true, message, severity });
    }, []);

    const hideToast = useCallback(() => {
        setState((prev) => ({ ...prev, open: false }));
    }, []);

    const value: ToastContextType = {
        success: (message) => showToast(message, "success"),
        error: (message) => showToast(message, "error"),
        warning: (message) => showToast(message, "warning"),
        info: (message) => showToast(message, "info"),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Snackbar
                open={state.open}
                autoHideDuration={3000}
                onClose={hideToast}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
            <Alert onClose={hideToast} severity={state.severity} variant="filled"  sx={{ backgroundColor: COLORS.primary }}>
                {state.message}
            </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};