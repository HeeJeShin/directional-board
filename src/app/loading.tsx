'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { COLORS } from '@/styles/theme';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                gap: 2,
            }}
        >
      <CircularProgress
          size={40}
          sx={{ color: COLORS.primary }}
      />
      <Typography
          variant="body2"
          sx={{ color: COLORS.textSecondary }}
      >
        로딩 중...
      </Typography>
    </Box>
    );
}