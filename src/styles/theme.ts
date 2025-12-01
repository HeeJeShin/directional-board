export const COLORS = {
  primary: '#1C4E4E',
  primaryLight: '#2A6B6B',
  primaryDark: '#133838',
  background: '#FFFFFF',
  backgroundSecondary: '#F9F9F9',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E5E5E5',
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