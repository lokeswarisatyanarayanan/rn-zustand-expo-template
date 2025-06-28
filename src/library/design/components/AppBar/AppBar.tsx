import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appBarStyles } from './AppBar.styles';
import type { AppBarProps } from './AppBar.types';
import { useTheme } from '../../hooks';

export const AppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  centerContent,
  backgroundColor,
  elevation = 4,
  height = 56,
  style,
  titleStyle,
  subtitleStyle,
  safeArea = true,
  statusBarHeight = true,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const statusBarHeightValue =
    statusBarHeight && Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const topPadding = safeArea ? insets.top : statusBarHeightValue;
  const bgColor = backgroundColor || theme.colors.background.primary;

  const appBarStyle = [
    appBarStyles.container,
    {
      backgroundColor: bgColor,
      height: height + topPadding,
      paddingTop: topPadding,
      elevation: Platform.OS === 'android' ? elevation : 0,
      shadowOpacity: Platform.OS === 'ios' ? (elevation > 0 ? 0.3 : 0) : 0,
      shadowRadius: Platform.OS === 'ios' ? elevation : 0,
      shadowOffset:
        Platform.OS === 'ios' ? { width: 0, height: elevation / 2 } : { width: 0, height: 0 },
    },
    style,
  ];

  return (
    <View style={appBarStyle}>
      <View style={appBarStyles.content}>
        <View style={appBarStyles.leftSection}>{leftAction}</View>

        <View style={appBarStyles.centerSection}>
          {centerContent || (
            <View style={appBarStyles.titleContainer}>
              {title && (
                <Text
                  style={[appBarStyles.title, { color: theme.colors.text.primary }, titleStyle]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  style={[
                    appBarStyles.subtitle,
                    { color: theme.colors.text.secondary },
                    subtitleStyle,
                  ]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={appBarStyles.rightSection}>{rightAction}</View>
      </View>
    </View>
  );
};
