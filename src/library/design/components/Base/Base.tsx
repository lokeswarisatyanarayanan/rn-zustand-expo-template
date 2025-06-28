import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { SpacingKey } from './Base.types';
import { useTheme } from '../../hooks';
import { getSpacingValue, getBackgroundColor } from '../../utils';

type BaseProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  center?: boolean;
  row?: boolean;
  backgroundColor?: string;
  padding?: SpacingKey;
};

const Base = ({
  children,
  style,
  center = false,
  row = false,
  backgroundColor,
  padding = 'medium',
}: BaseProps): React.JSX.Element => {
  const theme = useTheme();

  const baseStyle: ViewStyle = {
    flex: 1,
    flexDirection: row ? 'row' : 'column',
    alignItems: center ? 'center' : undefined,
    justifyContent: center ? 'center' : undefined,
    padding: getSpacingValue(theme, padding as SpacingKey),
    backgroundColor: getBackgroundColor(theme, backgroundColor),
  };

  return <View style={[baseStyle, style]}>{children}</View>;
};

export default Base;
