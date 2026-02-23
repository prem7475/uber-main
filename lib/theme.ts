/**
 * Professional Design System & Theme Configuration
 * Centralizes all design tokens for consistent styling across the app
 */

//  =============================================================================
// COLOR PALETTE
// =============================================================================

export const Colors = {
  // Primary Colors
  primary: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    500: "#0EA5E9",
    600: "#0284C7",
    700: "#0369A1",
    900: "#082F49",
  },

  // Neutral Colors
  neutral: {
    0: "#FFFFFF",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Status Colors
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  error: "#DC2626",

  // Semantic Colors
  background: "#FFFFFF",
  surface: "#F9FAFB",
  border: "#E5E7EB",
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  // Brand Colors
  brand: {
    black: "#000000",
    coral: "#F37254",
    coralLight: "#FCF3F1",
  },
};

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const Typography = {
  fonts: {
    primary: "JakartaSans",
    display: "JakartaSans",
    body: "JakartaSans",
  },

  sizes: {
    // Display
    display: { size: 48, weight: "700", lineHeight: 56 },
    heading1: { size: 40, weight: "700", lineHeight: 48 },
    heading2: { size: 32, weight: "700", lineHeight: 40 },
    heading3: { size: 28, weight: "700", lineHeight: 36 },

    // Body
    body1: { size: 18, weight: "400", lineHeight: 28 },
    body2: { size: 16, weight: "400", lineHeight: 24 },
    body3: { size: 14, weight: "400", lineHeight: 20 },

    // Labels
    label1: { size: 14, weight: "500", lineHeight: 20 },
    label2: { size: 12, weight: "500", lineHeight: 16 },
    label3: { size: 11, weight: "600", lineHeight: 14 },

    // Caption
    caption: { size: 12, weight: "400", lineHeight: 16 },
    captionSmall: { size: 10, weight: "400", lineHeight: 14 },
  },

  fontWeights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
};

// =============================================================================
// SPACING SYSTEM
// =============================================================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
};

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
};

// =============================================================================
// SHADOWS
// =============================================================================

export const Shadows = {
  none: "0 0 0 rgba(0,0,0,0)",
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  "2xl": {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 6,
  },
};

// =============================================================================
// GRADIENTS (Common Combinations)
// =============================================================================

export const Gradients = {
  // Primary gradients
  primary: "from-blue-600 to-blue-700",
  primaryDark: "from-black to-gray-900",
  primaryLight: "from-blue-50 to-blue-100",

  // Status gradients
  success: "from-green-500 to-green-600",
  danger: "from-red-500 to-red-600",
  warning: "from-yellow-500 to-yellow-600",

  // Neutral gradients
  neutral: "from-gray-50 to-gray-100",
  dark: "from-gray-800 to-gray-900",

  // Vibrant gradients
  vibrant: "from-purple-600 to-pink-600",
  ocean: "from-blue-600 to-cyan-500",
  sunset: "from-orange-400 to-red-500",
};

// =============================================================================
// COMPONENT STYLE PRESETS
// =============================================================================

export const ComponentPresets = {
  // Button presets
  buttonPrimary: {
    bg: `bg-gradient-to-r ${Gradients.primaryDark}`,
    text: "text-white",
    padding: "px-6 py-4",
    radius: "rounded-2xl",
    shadow: Shadows.lg,
  },

  buttonSecondary: {
    bg: "bg-gray-100 border-2 border-gray-300",
    text: "text-gray-700",
    padding: "px-6 py-4",
    radius: "rounded-2xl",
    shadow: Shadows.sm,
  },

  // Card presets
  cardDefault: {
    bg: "bg-white",
    border: "border-2 border-gray-100",
    radius: "rounded-3xl",
    padding: "p-6",
    shadow: Shadows.md,
  },

  cardElevated: {
    bg: "bg-white",
    border: "border-0",
    radius: "rounded-3xl",
    padding: "p-6",
    shadow: Shadows.lg,
  },

  cardGradient: {
    bg: `bg-gradient-to-br ${Gradients.primaryLight}`,
    border: "border-2 border-blue-300",
    radius: "rounded-3xl",
    padding: "p-6",
    shadow: Shadows.md,
  },

  // Input presets
  inputDefault: {
    bg: "bg-gray-50",
    border: "border-2 border-gray-200",
    radius: "rounded-xl",
    padding: "px-4 py-3",
    focused: {
      bg: "bg-white",
      border: "border-2 border-blue-500",
      shadow: Shadows.md,
    },
  },

  // Badge presets
  badgeSuccess: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
  },

  badgeDanger: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },

  badgeWarning: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-300",
  },

  badgeInfo: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
  },
};

// =============================================================================
// RESPONSIVE BREAKPOINTS
// =============================================================================

export const Breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// =============================================================================
// ANIMATION TIMINGS
// =============================================================================

export const AnimationTimings = {
  fast: 100,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const ZIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// =============================================================================
// COMPLETE THEME OBJECT
// =============================================================================

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  gradients: Gradients,
  componentPresets: ComponentPresets,
  breakpoints: Breakpoints,
  animationTimings: AnimationTimings,
  zIndex: ZIndex,
};

export default Theme;
