import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import { useAuthStore } from "@/stores/authStore";
import {LoginRequestType, LoginResponseType} from "@/types/auth.types";



export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (data: LoginRequestType) =>
            api.post(ENDPOINTS.LOGIN, { json: data }).json<LoginResponseType>(),
        onSuccess: (data) => {
            setAuth(data.token, data.user);
        },
    });
};

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    return logout;
};