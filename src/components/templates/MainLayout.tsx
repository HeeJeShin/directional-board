'use client';

import { Box } from '@mui/material';

import { COLORS } from '@/styles/theme';
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

interface MainLayoutPropsType {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutPropsType) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: COLORS.background,
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
