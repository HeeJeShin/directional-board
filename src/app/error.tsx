'use client';

import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { COLORS } from '@/styles/theme';

interface ErrorPropsType {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorPropsType) {
    useEffect(() => {
        console.error(error);
    }, [error]);

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
          <ErrorOutlineIcon
              sx={{ fontSize: 48, color: COLORS.primary }}
          />
          <Typography
              variant="h6"
              sx={{ color: COLORS.text, fontWeight: 600 }}
          >
            문제가 발생했습니다
          </Typography>
          <Typography
              variant="body2"
              sx={{ color: COLORS.textSecondary, textAlign: 'center' }}
          >
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </Typography>
          <Button
              variant="contained"
              onClick={reset}
              sx={{
                  mt: 1,
                  backgroundColor: COLORS.primary,
                  textTransform: 'none',
                  '&:hover': {
                      backgroundColor: COLORS.primaryDark,
                  },
              }}
          >
            다시 시도
          </Button>
        </Box>
    );
}