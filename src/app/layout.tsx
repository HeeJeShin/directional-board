import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Directional Board",
    description: "게시판 및 데이터 시각화",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" id="__next">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
    );
}