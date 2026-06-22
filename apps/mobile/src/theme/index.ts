export const Colors = {
  primary: '#6C63FF',      // vibrant purple
  primaryLight: '#EEE9FF',
  secondary: '#FF6584',    // coral/pink
  accent: '#FFD93D',       // sunny yellow
  success: '#6BCB77',      // green
  danger: '#FF6B6B',       // red
  warning: '#FFA500',
  white: '#FFFFFF',
  background: '#F9F7FF',
  surface: '#FFFFFF',
  border: '#E8E4F3',
  textPrimary: '#2D2D3A',
  textSecondary: '#6B6880',
  textMuted: '#AEAABF',
  cardShadow: 'rgba(108,99,255,0.12)',

  // Category colors
  cat: {
    animals: '#FF9F43',
    colors:  '#6C63FF',
    numbers: '#48CFAD',
    food:    '#FF6584',
    family:  '#A29BFE',
    body:    '#FD79A8',
    nature:  '#55EFC4',
    clothes: '#FDCB6E',
    home:    '#74B9FF',
    vehicles:'#00CEC9',
    emotions:'#E17055',
    shapes:  '#81ECEC',
  },
};

export const Fonts = {
  en: 'System',
  ar: 'Amiri',        // Arabic Naskh — bundled TTF
  ur: 'NotoNastaliqUrdu', // Urdu Nastaliq — bundled TTF
};

export const FontSizes = {
  xs:  12,
  sm:  14,
  md:  16,
  lg:  20,
  xl:  24,
  xxl: 32,
  hero: 48,
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const Radius = {
  sm:   8,
  md:   16,
  lg:   24,
  full: 999,
};

// Minimum touch target per accessibility (US-089)
export const MinTouchTarget = 48;

export const Shadows = {
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
};
