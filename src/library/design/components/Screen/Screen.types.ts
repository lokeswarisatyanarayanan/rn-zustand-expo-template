import type { ReactNode } from "react";
import type {
  ViewProps,
  ViewStyle,
  ScrollViewProps,
  StatusBarStyle,
} from "react-native";

export type SpacingKey =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "screenPadding";

export type BackgroundColorKey = "primary" | "secondary";

export interface ScreenProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  padding?: SpacingKey | number;
  paddingHorizontal?: SpacingKey | number;
  paddingVertical?: SpacingKey | number;
  backgroundColor?: BackgroundColorKey;
  scroll?: boolean;
  keyboardAvoiding?: boolean;
  statusBar?: boolean;
  statusBarStyle?: StatusBarStyle;
  safeArea?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  loading?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, "style" | "contentContainerStyle">;
}
