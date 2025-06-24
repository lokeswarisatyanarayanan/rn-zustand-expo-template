import type { Theme } from "../theme";
import type {
  SpacingKey,
  BackgroundColorKey,
} from "../components/Base/Base.types";

export const getSpacingValue = (
  theme: Theme,
  spacing?: SpacingKey | number
): number | undefined => {
  if (typeof spacing === "number") return spacing;
  if (typeof spacing === "string") return theme.spacing[spacing];
  return undefined;
};

export const getBackgroundColor = (
  theme: Theme,
  colorKey?: BackgroundColorKey | string
): string | undefined => {
  if (!colorKey) return undefined;
  if (typeof colorKey === "string") {
    // Check if it's a theme color key first
    if (colorKey === "primary" || colorKey === "secondary") {
      return theme.colors.background[colorKey as BackgroundColorKey];
    }
    // Otherwise treat as direct color value
    return colorKey;
  }
  return theme.colors.background[colorKey];
};
