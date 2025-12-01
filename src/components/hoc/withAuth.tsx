"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/useToast";
import { Box, CircularProgress } from "@mui/material";

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
    return function ProtectedComponent(props: T) {
        const router = useRouter();
        const pathname = usePathname();
        const { isLoggedIn, _hasHydrated } = useAuthStore();
        const toast = useToast();
        const hasRedirected = useRef(false);

        useEffect(() => {
            if (_hasHydrated && !isLoggedIn() && !hasRedirected.current) {
                hasRedirected.current = true;
                toast.warning("로그인이 필요합니다");
                router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
            }
        }, [_hasHydrated, isLoggedIn, router, toast, pathname]);

        // hydration 전이면 로딩
        if (!_hasHydrated) {
            return (
                <Box className="min-h-screen flex items-center justify-center">
                  <CircularProgress />
                </Box>
            );
        }

        if (!isLoggedIn()) {
            return null;
        }

        return <Component {...props} />;
    };
}