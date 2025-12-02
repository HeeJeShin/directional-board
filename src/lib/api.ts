import ky, { HTTPError } from "ky";
import { API_BASE_URL } from "./endpoints";
import { useAuthStore } from "@/stores/authStore";

export const api = ky.create({
    prefixUrl: API_BASE_URL,
    timeout: 10000, // 10초 타임아웃
    retry: {
        limit: 2,
        methods: ["get"],
        statusCodes: [408, 500, 502, 503, 504],
    },
    hooks: {
        beforeRequest: [
            (request) => {
                const token = useAuthStore.getState().token;

                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            async (_request, _options, response) => {
                // 401 Unauthorized - 토큰 만료/무효
                if (response.status === 401) {
                    useAuthStore.getState().logout();

                    // 로그인 페이지가 아니면 리다이렉트
                    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
                        window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`;
                    }
                }

                return response;
            },
        ],
    },
});

// 에러 메시지 추출 유틸
export const getErrorMessage = async (error: unknown): Promise<string> => {
    if (error instanceof HTTPError) {
        try {
            const body = await error.response.json() as { message?: string };
            return body.message || "요청 처리 중 오류가 발생했습니다";
        } catch {
            return "요청 처리 중 오류가 발생했습니다";
        }
    }

    if (error instanceof Error) {
        if (error.name === "TimeoutError") {
            return "요청 시간이 초과되었습니다";
        }
        return error.message;
    }

    return "알 수 없는 오류가 발생했습니다";
};