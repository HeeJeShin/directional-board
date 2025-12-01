'use client';

import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { COLORS } from '@/styles/theme';
import Logo from "@/components/atoms/Logo";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: COLORS.backgroundSecondary,
                borderTop: `1px solid ${COLORS.border}`,
                py: 4,
                mt: 'auto',
            }}
        >
          <Container maxWidth="lg">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    gap: 2,
                }}
            >
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Logo size="small" />
                <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSecondary, mt: 1 }}
                >
                © {currentYear} Directional. Built by Shin Heeje
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
    );
}