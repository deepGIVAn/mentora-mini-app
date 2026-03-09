import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  isLoading,
  style 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary': return [styles.button, styles.secondary];
      case 'outline': return [styles.button, styles.outline];
      default: return [styles.button, styles.primary];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline': return [styles.text, styles.outlineText];
      default: return [styles.text, styles.primaryText];
    }
  };

  return (
    <TouchableOpacity 
      style={[getButtonStyle(), style]} 
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? Theme.colors.primary : '#fff'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600' as any,
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: Theme.colors.primary,
  },
});
