import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import type {
    PostType,
    PostCreateRequestType,
    PostUpdateRequestType,
    PostListParamsType,
    PostListResponseType,
    DeleteResponseType,
} from "@/types/post.types";
import {toSearchParams} from "@/lib/utils";

// 게시글 목록 (무한스크롤)
export const usePosts = (params?: Omit<PostListParamsType, "nextCursor" | "prevCursor">) => {
    return useInfiniteQuery({
        queryKey: ["posts", params],
        queryFn: ({ pageParam }) =>
            api
                .get(ENDPOINTS.POSTS, {
                    searchParams: toSearchParams({ ...params, nextCursor: pageParam }),
                })
                .json<PostListResponseType>(),
        initialPageParam: "",
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
};

// 게시글 단건
export const usePost = (id: string) => {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => api.get(ENDPOINTS.POST_BY_ID(id)).json<PostType>(),
        enabled: !!id,
    });
};

// 게시글 작성
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PostCreateRequestType) =>
            api.post(ENDPOINTS.POSTS, { json: data }).json<PostType>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};

// 게시글 수정
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PostUpdateRequestType }) =>
            api.patch(ENDPOINTS.POST_BY_ID(id), { json: data }).json<PostType>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};

// 게시글 삭제
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(ENDPOINTS.POST_BY_ID(id)).json<DeleteResponseType>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};

// 전체 삭제
export const useDeleteAllPosts = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => api.delete(ENDPOINTS.POSTS).json<DeleteResponseType>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};

// Mock 게시글
export const useMockPosts = (count?: number) => {
    return useQuery({
        queryKey: ["mockPosts", count],
        queryFn: () =>
            api
                .get(ENDPOINTS.MOCK_POSTS, { searchParams: count ? { count } : {} })
                .json<PostType[]>(),
    });
};