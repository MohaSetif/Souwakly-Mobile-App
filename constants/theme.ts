/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Platform } from 'react-native';

const tintColorLight = '#D4AF37'; // Antique Gold
const tintColorDark = '#FFD700';  // Gold

export const GoldColors = {
  primary: '#FFD700',      // Pure Gold
  secondary: '#C5A021',    // Burnished Gold
  accent: '#FF8C00',       // Dark Orange Gold
  dark: '#030303',         // Deep Onyx
  light: '#FDFCFB',        // Soft Pearl
  glass: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  champagne: '#F9E79F',
  bronze: '#CD7F32',
  shadow: 'rgba(197, 160, 33, 0.2)',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    card: '#f9f9f9',
    border: '#e1e1e1',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: GoldColors.primary,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: GoldColors.primary,
    card: '#0A0A0A',
    border: 'rgba(255, 215, 0, 0.1)',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
