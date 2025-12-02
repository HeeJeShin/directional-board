"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
};

const createGetSnapshot = (breakpoint: number) => () => {
    return window.innerWidth < breakpoint;
};

const getServerSnapshot = () => false;

export const useMobile = (breakpoint: number = 768): boolean => {
    return useSyncExternalStore(
        subscribe,
        createGetSnapshot(breakpoint),
        getServerSnapshot
    );
};