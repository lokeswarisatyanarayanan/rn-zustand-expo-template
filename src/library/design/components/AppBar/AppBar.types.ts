import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

export interface AppBarProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  centerContent?: ReactNode;
  backgroundColor?: string;
  elevation?: number;
  height?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  safeArea?: boolean;
  statusBarHeight?: boolean;
}
