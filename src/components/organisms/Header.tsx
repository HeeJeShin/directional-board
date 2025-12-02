'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AppBar, Toolbar, Box, Container, Button } from '@mui/material';

import { COLORS } from '@/styles/theme';
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/atoms/NavLink";
import { useAuthStore } from "@/stores/authStore";

const NAV_ITEMS = [
    { href: '/posts', label: '내 게시물 보기' },
    { href: '/charts', label: '차트' },
    { href: '/posts/mock', label: '게시판(목업)' },
];

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { token, logout } = useAuthStore();

    const handleAuthClick = () => {
        if (token) {
            logout();
            router.push('/');
        } else {
            router.push('/');
        }
    };

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
                                active={pathname === item.href || (item.href !== '/posts/mock' && pathname.startsWith(item.href) && !pathname.includes('/mock'))}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleAuthClick}
                            sx={{
                                ml: 2,
                                backgroundColor: COLORS.primary,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: COLORS.primaryDark,
                                },
                            }}
                        >
                            {token ? '로그아웃' : '로그인'}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;