"use client";

import { withAuth } from "@/components/hoc/withAuth";
import { PostForm } from "@/components/organisms/post/PostForm";
import { COLORS } from "@/styles/theme";

const NewPostPage = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1
                className="text-2xl font-bold mb-8"
                style={{ color: COLORS.text }}
            >
                새 게시글 작성
            </h1>
            <div
                className="rounded-xl border p-8"
                style={{
                    backgroundColor: COLORS.background,
                    borderColor: COLORS.borderLight,
                }}
            >
                <PostForm />
            </div>
        </div>
    );
};

export default withAuth(NewPostPage);