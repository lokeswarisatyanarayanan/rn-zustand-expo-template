import type { ReactNode } from 'react';
import type { ViewProps, ViewStyle } from 'react-native';

export type SpacingKey =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'screenPadding';
export type BackgroundColorKey = 'primary' | 'secondary';

export interface BaseProps extends Omit<ViewProps, 'style'> {
  children?: ReactNode;
  padding?: SpacingKey | number;
  paddingHorizontal?: SpacingKey | number;
  paddingVertical?: SpacingKey | number;
  paddingTop?: SpacingKey | number;
  paddingBottom?: SpacingKey | number;
  paddingLeft?: SpacingKey | number;
  paddingRight?: SpacingKey | number;
  margin?: SpacingKey | number;
  marginHorizontal?: SpacingKey | number;
  marginVertical?: SpacingKey | number;
  marginTop?: SpacingKey | number;
  marginBottom?: SpacingKey | number;
  marginLeft?: SpacingKey | number;
  marginRight?: SpacingKey | number;
  backgroundColor?: BackgroundColorKey | string;
  flex?: number;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  center?: boolean;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
  row?: boolean;
  wrap?: boolean;
  style?: ViewStyle;
}
