"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Box,
    Container,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { COLORS } from "@/styles/theme";
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/atoms/NavLink";
import { useAuthStore } from "@/stores/authStore";

const NAV_ITEMS = [
    { href: "/posts", label: "내 게시물 보기" },
    { href: "/charts", label: "차트" },
    { href: "/posts/mock", label: "게시판(목업)" },
];

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { token, logout } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleAuthClick = () => {
        if (token) {
            logout();
            router.push("/");
        } else {
            router.push("/");
        }
        setDrawerOpen(false);
    };

    const handleNavClick = (href: string) => {
        router.push(href);
        setDrawerOpen(false);
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const isActiveLink = (href: string) => {
        return (
            pathname === href ||
            (href !== "/posts/mock" &&
                pathname.startsWith(href) &&
                !pathname.includes("/mock"))
        );
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
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between", minHeight: 64 }}
                >
                    <Box component="a" href="/" sx={{ textDecoration: "none" }}>
                        <Logo size="medium" />
                    </Box>

                    {/* 데스크탑 네비게이션 - md 이상에서만 표시 */}
                    <Box
                        component="nav"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.href}
                                href={item.href}
                                active={isActiveLink(item.href)}
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
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: COLORS.primaryDark,
                                },
                            }}
                        >
                            {token ? "로그아웃" : "로그인"}
                        </Button>
                    </Box>

                    {/* 모바일 햄버거 버튼 - md 미만에서만 표시 */}
                    <IconButton
                        onClick={toggleDrawer(true)}
                        aria-label="메뉴 열기"
                        sx={{
                            display: { xs: "flex", md: "none" },
                            color: COLORS.text,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* 모바일 드로어 */}
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        PaperProps={{
                            sx: {
                                backgroundColor: COLORS.white,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 280,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            role="presentation"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 2,
                                    borderBottom: `1px solid ${COLORS.border}`,
                                }}
                            >
                                <Logo size="small" />
                                <IconButton
                                    onClick={toggleDrawer(false)}
                                    aria-label="메뉴 닫기"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <List sx={{ flex: 1, pt: 1 }}>
                                {NAV_ITEMS.map((item) => (
                                    <ListItem key={item.href} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleNavClick(item.href)}
                                            sx={{
                                                py: 1.5,
                                                px: 3,
                                                backgroundColor: isActiveLink(item.href)
                                                    ? COLORS.backgroundSecondary
                                                    : "transparent",
                                                borderLeft: isActiveLink(item.href)
                                                    ? `3px solid ${COLORS.primary}`
                                                    : "3px solid transparent",
                                                "&:hover": {
                                                    backgroundColor: COLORS.backgroundSecondary,
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    sx: {
                                                        color: isActiveLink(item.href)
                                                            ? COLORS.primary
                                                            : COLORS.text,
                                                        fontWeight: isActiveLink(item.href)
                                                            ? 600
                                                            : 400,
                                                        fontSize: "0.95rem",
                                                    },
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider />

                            <Box sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleAuthClick}
                                    sx={{
                                        backgroundColor: COLORS.primary,
                                        textTransform: "none",
                                        py: 1.2,
                                        "&:hover": {
                                            backgroundColor: COLORS.primaryDark,
                                        },
                                    }}
                                >
                                    {token ? "로그아웃" : "로그인"}
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;