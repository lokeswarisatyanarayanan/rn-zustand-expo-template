const baseUnit = 4;

export const spacing = {
  xxsmall: baseUnit * 0.5, // 2
  xsmall: baseUnit, // 4
  small: baseUnit * 2, // 8
  medium: baseUnit * 3, // 12
  large: baseUnit * 4, // 16
  xlarge: baseUnit * 6, // 24
  xxlarge: baseUnit * 8, // 32
  screenPadding: baseUnit * 5, // 20

  get: (multiplier = 1): number => baseUnit * multiplier,
};
