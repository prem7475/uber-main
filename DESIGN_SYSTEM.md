# RideHub - Professional Design System & Style Guide

## 🎨 Design Philosophy

Our design system emphasizes **clarity, professionalism, and user-centric experiences**. Every component follows modern design principles with consistent spacing, typography, and color usage.

---

## 📦 Component Library

### **1. CustomButton (Enhanced)**
Professional button component with multiple variants and sizes.

**Variants:**
- `primary` - Full-width black gradient button (default)
- `secondary` - Light gray secondary button
- `danger` - Red gradient for destructive actions
- `success` - Green gradient for positive actions
- `outline` - Bordered transparent button
- `ghost` - Text-only button
- `premium` - Blue-purple gradient for premium features

**Sizes:**
- `sm` - Small button (py-2 px-4 text-sm)
- `md` - Medium button (py-3 px-5 text-base)
- `lg` - Large button (py-4 px-6 text-lg) - Default

**Props:**
```typescript
<CustomButton
  title="Book a Ride"
  bgVariant="primary"
  textVariant="default"
  size="lg"
  fullWidth
  loading={false}
  disabled={false}
  onPress={() => {}}
/>
```

---

### **2. InputField (Enhanced)**
Professional text input with focus states, validation, and error handling.

**Features:**
- Blue focus border and shadow
- Error state with red border and error message
- Success state with green checkmark
- Disabled state with gray colors
- Icon support with color changes on focus
- Proper label styling

**Props:**
```typescript
<InputField
  label="Email Address"
  placeholder="you@example.com"
  icon={icons.email}
  error="Invalid email format"
  success={isValid}
  disabled={false}
  onChangeText={handleChange}
/>
```

---

### **3. ProfessionalHeader**
Elegant header component for screens with title, subtitle, back button, and right actions.

**Variants:**
- `dark` - Dark gradient background (default)
- `light` - White background with border
- `gradient` - Custom gradient background

**Features:**
- Automatic back navigation
- Custom right action button
- Responsive title sizing
- Subtitle support

**Props:**
```typescript
<ProfessionalHeader
  title="Help & Support"
  subtitle="Get answers to your questions"
  showBack={true}
  variant="dark"
  rightAction={{
    icon: "🔧",
    onPress: () => {}
  }}
/>
```

---

### **4. ProfessionalCard**
Versatile card component for content containers.

**Variants:**
- `default` - White with subtle border and shadow
- `elevated` - Strong shadow for emphasis
- `outline` - Border-only style
- `gradient` - Custom gradient background

**Features:**
- Icon and title support
- Flexible content area
- Touchable prop support
- Multiple gradient presets

**Props:**
```typescript
<ProfessionalCard
  icon="🚗"
  title="Available Drivers"
  subtitle="Find your perfect match"
  variant="elevated"
  onPress={() => {}}
>
  {/* Content here */}
</ProfessionalCard>
```

---

### **5. ProfessionalBadge**
Status and label badge component.

**Variants:**
- `default` - Gray background
- `success` - Green badge
- `danger` - Red badge
- `warning` - Yellow badge
- `info` - Blue badge
- `primary` - Black badge

**Sizes:**
- `sm` - Small badge
- `md` - Medium badge (default)
- `lg` - Large badge

**Props:**
```typescript
<ProfessionalBadge
  text="5.0 Rating"
  variant="success"
  size="md"
  icon="⭐"
/>
```

---

### **6. ProfessionalFooter**
Bottom navigation component with badge support.

**Features:**
- Tab-based navigation
- Badge indicators for unread counts
- Active tab highlighting
- Touch feedback

**Props:**
```typescript
<ProfessionalFooter
  activeItem="home"
  menuItems={[
    {
      id: "home",
      icon: "🏠",
      label: "Home",
      onPress: () => {}
    },
    // ... more items
  ]}
/>
```

---

### **7. LoadingSpinner**
Professional loading indicator with message support.

**Features:**
- Blue gradient container
- Optional loading message
- Full-screen overlay option

**Props:**
```typescript
<LoadingSpinner
  size="large"
  message="Finding nearby drivers..."
  fullScreen={true}
/>
```

---

### **8. EmptyState**
Elegant empty state display for no results.

**Variants:**
- `default` - Card-style with action
- `minimal` - Minimal styling
- `card` - Elevated card style

**Props:**
```typescript
<EmptyState
  icon="🚫"
  title="No Rides Yet"
  subtitle="Book your first ride to get started"
  actionText="Book Now"
  onActionPress={() => {}}
/>
```

---

## 🎯 Color Palette

### Primary Colors
- **Primary Blue**: `#0EA5E9` (Sky blue)
- **Primary Dark**: `#0369A1` (Deep blue)
- **Black**: `#000000` (Primary action)

### Status Colors
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Light Blue)

### Neutrals
- **White**: `#FFFFFF`
- **Light Gray**: `#F9FAFB`
- **Gray**: `#9CA3AF`
- **Dark Gray**: `#4B5563`
- **Black**: `#111827`

---

## 📏 Typography System

### Font: Plus Jakarta Sans (Primary)

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 48px | Bold | Hero headings |
| Heading 1 | 40px | Bold | Page titles |
| Heading 2 | 32px | Bold | Section titles |
| Heading 3 | 28px | Bold | Subsection titles |
| Body 1 | 18px | Regular | Large body text |
| Body 2 | 16px | Regular | Standard body text |
| Body 3 | 14px | Regular | Small body text |
| Label | 14px | Semibold | Button text, labels |
| Caption | 12px | Regular | Supporting text |

---

## 📐 Spacing System

```
xs:   4px
sm:   8px
md:   12px
lg:   16px
xl:   20px
2xl:  24px
3xl:  32px
4xl:  40px
5xl:  48px
```

---

## 🔄 Border Radius

```
none:  0px
xs:    4px
sm:    8px
md:    12px
lg:    16px
xl:    20px
2xl:   24px
3xl:   32px
full:  9999px (circles)
```

---

## 🌟 Shadow System

| Level | iOS Shadow | Android Elevation |
|-------|-----------|-------------------|
| sm | Small subtle | 1 |
| md | Noticeable | 2 |
| lg | Prominent | 4 |
| xl | Strong | 5 |
| 2xl | Very strong | 6 |

---

## 🎨 Gradient Presets

### Primary Gradients
- **Primary Dark**: `from-black to-gray-900`
- **Primary Blue**: `from-blue-600 to-blue-700`
- **Primary Light**: `from-blue-50 to-blue-100`

### Status Gradients
- **Success**: `from-green-500 to-green-600`
- **Danger**: `from-red-500 to-red-600`
- **Warning**: `from-yellow-500 to-yellow-600`

### Vibrant Gradients
- **Ocean**: `from-blue-600 to-cyan-500`
- **Sunset**: `from-orange-400 to-red-500`
- **Vibrant**: `from-purple-600 to-pink-600`

---

## ✅ Usage Guidelines

### Button Usage
- **Primary**: Main actions (Book, Send, Continue)
- **Secondary**: Alternative actions (Cancel, Skip)
- **Danger**: Destructive actions (Delete, Logout)
- **Success**: Confirmation actions (Confirm, Apply)
- **Outline**: Non-essential actions
- **Ghost**: Tertiary/minimal actions

### Card Usage
- **Default**: Standard content containers
- **Elevated**: Highlight important content with shadows
- **Outline**: Minimal, lightweight containers
- **Gradient**: Featured content, special promotions

### Badge Usage
- **Success**: Completed, confirmed, online
- **Danger**: Error, urgent, offline
- **Warning**: Caution, alert, needs attention
- **Info**: Informational, neutral status
- **Primary**: Active, selected, featured

---

## 🎬 Animation Guidelines

| Timing | Duration | Usage |
|--------|----------|-------|
| fast | 100ms | Quick feedback |
| normal | 300ms | Standard transitions |
| slow | 500ms | Emphasis animations |
| verySlow | 1000ms | Loading states |

---

## 📱 Responsive Design

### Breakpoints
- **xs**: 0px (Mobile phones)
- **sm**: 640px (Small tablets)
- **md**: 768px (Tablets)
- **lg**: 1024px (Desktops)
- **xl**: 1280px (Large desktops)
- **2xl**: 1536px (Ultra-wide)

---

## 🏗️ Theme Integration

All components are integrated with the centralized `theme` system in `lib/theme.ts`. This ensures consistency across the entire app.

```typescript
import { Theme, Colors, Gradients } from '@/lib/theme';

// Use predefined colors
const headerColor = Theme.colors.primary[600];

// Use preset styles
const buttonStyle = Theme.componentPresets.buttonPrimary;

// Use spacing values
const padding = Theme.spacing.lg;
```

---

## 🔍 Accessibility

- All buttons have `activeOpacity` for touch feedback
- Color contrast ratios meet WCAG AA standards
- Touch targets are minimum 44x44px
- Error messages are clearly visible
- Icons are accompanied by text labels where needed

---

## 📋 Implementation Checklist

- [x] CustomButton with variants and sizes
- [x] InputField with validation states
- [x] ProfessionalHeader
- [x] ProfessionalFooter
- [x] ProfessionalCard variants
- [x] ProfessionalBadge statuses
- [x] LoadingSpinner component
- [x] EmptyState component
- [x] Centralized theme system
- [x] Color palette
- [x] Typography system
- [x] Spacing system
- [x] Shadow system
- [x] Gradient presets

---

## 🚀 Next Steps

1. **Apply to All Screens** - Update all app screens to use these components
2. **Theme Customization** - Allow theme switching (light/dark mode)
3. **Component Animations** - Add entrance/exit animations
4. **Accessibility** - Implement screen reader support
5. **Testing** - Add snapshot and component tests

---

## 📞 Support

For questions about the design system, refer to:
- Component files in `/components`
- Theme configuration in `/lib/theme.ts`
- Individual screen implementations in `/app`

**Created with ❤️ for RideHub**
