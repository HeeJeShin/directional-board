'use client';

import Link from 'next/link';
import { Button } from '@mui/material';
import { COLORS } from '@/styles/theme';

interface NavLinkPropsType {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export default function NavLink({ href, children, active = false }: NavLinkPropsType) {
  return (
    <Button
      component={Link}
      href={href}
      sx={{
        color: active ? COLORS.primary : COLORS.text,
        fontWeight: active ? 600 : 400,
        textTransform: 'none',
        fontSize: '0.95rem',
        px: 2,
        '&:hover': {
          backgroundColor: 'transparent',
          color: COLORS.primary,
        },
      }}
    >
      {children}
    </Button>
  );
}
