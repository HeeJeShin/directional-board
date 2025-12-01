// 디자인 테마 상수
export const COLORS = {
  primary: '#1C4E4E',      // 포인트 색상
  primaryLight: '#2A6B6B',
  primaryDark: '#133838',
  background: '#FFFFFF',
  backgroundSecondary: '#F9F9F9',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E5E5E5',
  white: '#FFFFFF',
} as const;

export type ColorsType = typeof COLORS;