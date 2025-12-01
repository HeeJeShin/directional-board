'use client';

import { Typography } from '@mui/material';
import { COLORS } from '@/styles/theme';

interface LogoPropsType {
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
};

export default function Logo({ size = 'medium' }: LogoPropsType) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: sizeMap[size],
        fontWeight: 700,
        color: COLORS.primary,
        letterSpacing: '-0.02em',
      }}
    >
      Directional
    </Typography>
  );
}
