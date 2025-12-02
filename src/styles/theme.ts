// 디자인 테마 상수
export const COLORS = {
  primary: '#1C4E4E',
  primaryLight: '#2A6B6B',
  primaryDark: '#133838',
  primaryBg: '#E8F5F5',       // 아주 연한 민트 (테이블 헤더용)
  primaryBgLight: '#F2FAFA',  // 더 연한 민트 (hover용)
  background: '#FFFFFF',
  backgroundSecondary: '#F9F9F9',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E5E5E5',
  borderLight: '#e1efef',     // 시그니처 기반 연한 테두리
  white: '#FFFFFF',
} as const;

export const CHART_COLORS = [
  '#1C4E4E',
  '#4e8888',
  '#8cb8b8',
  '#badfdf',
  '#dfeded',
] as const;

export type ColorsType = typeof COLORS;