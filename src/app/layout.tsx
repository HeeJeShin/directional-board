import type { Metadata } from 'next';

import '@/styles/globals.css';
import {Providers} from "@/lib/providers";
import MainLayout from "@/components/templates/MainLayout";

export const metadata: Metadata = {
    title: 'Directional Board',
    description: '게시판 및 데이터 시각화 서비스',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
          <body id="__next">
            <Providers>
              <MainLayout>{children}</MainLayout>
            </Providers>
          </body>
        </html>
    );
}