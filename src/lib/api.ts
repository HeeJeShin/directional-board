import ky from "ky";
import { API_BASE_URL } from "./endpoints";
import { useAuthStore } from "@/stores/authStore";

export const api = ky.create({
    prefixUrl: API_BASE_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = useAuthStore.getState().token;

                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
    },
});