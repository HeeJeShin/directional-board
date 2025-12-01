'use client';

import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Link from 'next/link';
import { COLORS } from '@/styles/theme';

export default function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                gap: 2,
                px: 2,
            }}
        >
      <SearchOffIcon
          sx={{ fontSize: 48, color: COLORS.primary }}
      />
      <Typography
          variant="h5"
          sx={{ color: COLORS.text, fontWeight: 700 }}
      >
        404
      </Typography>
      <Typography
          variant="body1"
          sx={{ color: COLORS.textSecondary, textAlign: 'center' }}
      >
        페이지를 찾을 수 없습니다
      </Typography>
      <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{
              mt: 1,
              backgroundColor: COLORS.primary,
              textTransform: 'none',
              '&:hover': {
                  backgroundColor: COLORS.primaryDark,
              },
          }}
      >
        홈으로 돌아가기
      </Button>
    </Box>
    );
}