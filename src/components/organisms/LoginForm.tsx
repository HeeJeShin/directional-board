"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { loginSchema, LoginFormType } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "/posts";
    const toast = useToast();
    const { mutate: login, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormType) => {
        login(data, {
            onSuccess: () => {
                toast.success("로그인 성공!");
                router.push(returnUrl);
            },
            onError: () => {
                toast.error("이메일 또는 비밀번호가 올바르지 않습니다");
            },
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-sm"
        >
          <Typography variant="h5" className="text-center font-bold">
            로그인
          </Typography>

          <Input
              label="이메일"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
          />

          <Input
              label="비밀번호"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" loading={isPending}>
            로그인
          </Button>
        </Box>
    );
}