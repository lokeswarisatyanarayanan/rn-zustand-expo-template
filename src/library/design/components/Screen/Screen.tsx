import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  type ViewStyle,
} from "react-native";
import { screenStyles } from "./Screen.styles";
import type { ScreenProps } from "./Screen.types";
import { useTheme } from "../../hooks";
import { getSpacingValue, getBackgroundColor } from "../../utils";

export const Screen: React.FC<ScreenProps> = ({
  children,
  padding = "screenPadding",
  paddingHorizontal,
  paddingVertical,
  backgroundColor = "primary",
  scroll = false,
  keyboardAvoiding = true,
  statusBar = true,
  statusBarStyle,
  safeArea = true,
  style,
  contentContainerStyle,
  loading = false,
  scrollViewProps,
  ...rest
}) => {
  const theme = useTheme();

  const screenStyle: ViewStyle = {
    padding: getSpacingValue(theme, padding),
    paddingHorizontal: getSpacingValue(theme, paddingHorizontal),
    paddingVertical: getSpacingValue(theme, paddingVertical),
    backgroundColor: getBackgroundColor(theme, backgroundColor),
  };

  const derivedStatusBarStyle = statusBarStyle || "dark-content";
  const rootBackgroundColor = getBackgroundColor(theme, backgroundColor);

  const content = scroll ? (
    <ScrollView
      style={[screenStyles.scrollView, style]}
      contentContainerStyle={[
        screenStyle,
        screenStyles.scrollContent,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[screenStyles.container, screenStyle, style]} {...rest}>
      {children}
    </View>
  );

  const wrappedContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={screenStyles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  const screenContent = safeArea ? (
    <SafeAreaView style={screenStyles.safeArea}>{wrappedContent}</SafeAreaView>
  ) : (
    wrappedContent
  );

  return (
    <View style={[screenStyles.root, { backgroundColor: rootBackgroundColor }]}>
      {statusBar && (
        <StatusBar
          barStyle={derivedStatusBarStyle}
          backgroundColor="transparent"
          translucent
        />
      )}
      {screenContent}
    </View>
  );
};
