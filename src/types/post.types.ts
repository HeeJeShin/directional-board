export type CategoryType = "NOTICE" | "QNA" | "FREE";
export type SortFieldType = "createdAt" | "title";
export type SortOrderType = "asc" | "desc";

export interface PostType {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: CategoryType;
    tags: string[];
    createdAt: string;
}

export interface PostCreateRequestType {
    title: string;
    body: string;
    category: CategoryType;
    tags?: string[];
}

export interface PostUpdateRequestType {
    title?: string;
    body?: string;
    category?: CategoryType;
    tags?: string[];
}

export interface PostListParamsType {
    limit?: number;
    prevCursor?: string;
    nextCursor?: string;
    sort?: SortFieldType;
    order?: SortOrderType;
    category?: CategoryType;
    from?: string;
    to?: string;
    search?: string;
}

export interface PostListResponseType {
    items: PostType[];
    nextCursor: string | null;
    prevCursor: string | null;
}

export interface DeleteResponseType {
    deleted: number;
}

export interface MockPostListResponseType {
    items: PostType[];
    count: number;
}