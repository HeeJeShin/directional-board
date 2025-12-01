import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserType } from "@/types/auth.types";

interface AuthState {
    token: string | null;
    user: UserType | null;
    setAuth: (token: string, user: UserType) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            isLoggedIn: () => !!get().token,
        }),
        {
            name: "auth-storage",
        }
    )
);