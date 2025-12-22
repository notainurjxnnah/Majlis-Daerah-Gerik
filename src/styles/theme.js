export const theme = {
  colors: {
    primary: {
      dark: '#0A1D37',
      bright: '#1E3A8A',
      light: '#3B82F6'
    },
    accent: '#FACC15',
    background: '#F3F4F6',
    card: '#FFFFFF',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      light: '#9CA3AF'
    },
    status: {
      urgent: '#DC2626',
      belumDiminit: '#2563EB',
      dalamTindakan: '#FACC15',
      selesai: '#16A34A',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 10px 25px rgba(0,0,0,0.1)',
    xl: '0 20px 40px rgba(0,0,0,0.15)'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px'
  },
  zIndex: {
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700
  }
};

// CSS utility classes for quick reference
export const cssUtilities = {
  // Color utilities
  textPrimary: { color: '#111827' },
  textSecondary: { color: '#6B7280' },
  textAccent: { color: '#FACC15' },
  textBlue: { color: '#1E3A8A' },
  textRed: { color: '#DC2626' },
  textGreen: { color: '#16A34A' },
  textYellow: { color: '#F59E0B' },
  
  // Background utilities
  bgPrimary: { backgroundColor: '#0A1D37' },
  bgSecondary: { backgroundColor: '#1E3A8A' },
  bgAccent: { backgroundColor: '#FACC15' },
  bgGray50: { backgroundColor: '#F9FAFB' },
  bgGray100: { backgroundColor: '#F3F4F6' },
  bgGray200: { backgroundColor: '#E5E7EB' },
  bgWhite: { backgroundColor: '#FFFFFF' },
  
  // Status badge colors
  statusUrgent: { backgroundColor: '#FEE2E2', color: '#DC2626' },
  statusBelumDiminit: { backgroundColor: '#DBEAFE', color: '#2563EB' },
  statusDalamTindakan: { backgroundColor: '#FEF3C7', color: '#D97706' },
  statusSelesai: { backgroundColor: '#DCFCE7', color: '#16A34A' },
  
  // Border colors
  borderGray200: { borderColor: '#E5E7EB' },
  borderGray300: { borderColor: '#D1D5DB' },
  borderPrimary: { borderColor: '#1E3A8A' },
  
  // Spacing utilities
  spacingXS: { margin: '0.25rem', padding: '0.25rem' },
  spacingSM: { margin: '0.5rem', padding: '0.5rem' },
  spacingMD: { margin: '1rem', padding: '1rem' },
  spacingLG: { margin: '1.5rem', padding: '1.5rem' },
  spacingXL: { margin: '2rem', padding: '2rem' },
  
  // Typography utilities
  fontLight: { fontWeight: 300 },
  fontNormal: { fontWeight: 400 },
  fontMedium: { fontWeight: 500 },
  fontSemibold: { fontWeight: 600 },
  fontBold: { fontWeight: 700 },
  
  // Size utilities
  textXS: { fontSize: '0.75rem' },
  textSM: { fontSize: '0.875rem' },
  textBase: { fontSize: '1rem' },
  textLG: { fontSize: '1.125rem' },
  textXL: { fontSize: '1.25rem' },
  
  // Border radius utilities
  roundedSM: { borderRadius: '4px' },
  roundedMD: { borderRadius: '8px' },
  roundedLG: { borderRadius: '12px' },
  roundedFull: { borderRadius: '9999px' },
  
  // Shadow utilities
  shadowSM: { boxShadow: '0 1px 3px rgba(0,0,0,0.12)' },
  shadowMD: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  shadowLG: { boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  
  // Flex utilities
  flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  flexBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  flexCol: { display: 'flex', flexDirection: 'column' },
  
  // Common component styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '1.5rem'
  },
  
  buttonPrimary: {
    backgroundColor: '#1E3A8A',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: '500'
  },
  
  buttonSecondary: {
    backgroundColor: '#FACC15',
    color: '#111827',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: '500'
  },
  
  // Form styles
  formInput: {
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem'
  },
  
  formLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  }
};

// Helper function to generate CSS variables
export function generateCSSVariables() {
  const variables = {};
  
  // Convert theme to CSS variables
  Object.entries(theme.colors).forEach(([category, values]) => {
    if (typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            variables[`--color-${category}-${key}-${subKey}`] = subValue;
          });
        } else {
          variables[`--color-${category}-${key}`] = value;
        }
      });
    }
  });
  
  // Add other theme properties
  Object.entries(theme.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });
  
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });
  
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });
  
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    variables[`--z-${key}`] = value;
  });
  
  return variables;
}

// Helper function to apply theme to element
export function applyTheme(element = document.documentElement, customTheme = {}) {
  const mergedTheme = { ...theme, ...customTheme };
  const variables = generateCSSVariables();
  
  Object.entries(variables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
  
  return mergedTheme;
}

// Export default theme
export default theme;
