import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserType } from "@/types/auth.types";

interface AuthState {
    token: string | null;
    user: UserType | null;
    _hasHydrated: boolean;
    setAuth: (token: string, user: UserType) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            _hasHydrated: false,
            setAuth: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            isLoggedIn: () => !!get().token,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);