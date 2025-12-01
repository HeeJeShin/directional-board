'use client';

import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, Container, Button } from '@mui/material';

import { COLORS } from '@/styles/theme';
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/atoms/NavLink";

const NAV_ITEMS = [
  { href: '/posts', label: '게시판' },
  { href: '/charts', label: '차트' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: COLORS.white,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <Box component="a" href="/" sx={{ textDecoration: 'none' }}>
            <Logo size="medium" />
          </Box>

          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={pathname.startsWith(item.href)}
              >
                {item.label}
              </NavLink>
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{
                ml: 2,
                backgroundColor: COLORS.primary,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: COLORS.primaryDark,
                },
              }}
            >
              로그인
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
