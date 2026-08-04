---
name: Aura Flora
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c19'
  on-tertiary-container: '#838480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e3e3de'
  tertiary-fixed-dim: '#c6c7c2'
  on-tertiary-fixed: '#1a1c19'
  on-tertiary-fixed-variant: '#454744'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for the high-end floral market, positioning botanical arrangements as pieces of fine art. The brand personality is poised, exclusive, and quiet—allowing the vibrant colors of the photography to take center stage against a disciplined, minimalist backdrop.

The style is **Luxury Minimalism** with an editorial edge. It prioritizes vast negative space, intentional asymmetry, and high-fashion aesthetics. Every interaction should feel deliberate and smooth, evoking the sensory experience of a high-end boutique. The goal is to move the user from a transactional mindset to an aspirational one, where they aren't just buying flowers, but investing in an atmosphere.

## Colors

The palette is anchored in a monochromatic foundation to maintain a timeless, high-fashion look. 

- **Primary (Deep Black):** Used for primary typography, borders, and high-impact UI elements. It provides the necessary weight to the minimalist layout.
- **Secondary (Subtle Gold):** Reserved for delicate accents, subtle hover states, and premium signaling. Use sparingly to avoid visual fatigue.
- **Surface (Soft Beige):** Employed as a secondary background color to create subtle depth and "paper-like" texture between sections.
- **Base (White):** The primary canvas. High-gloss white is essential for the airy, clean aesthetic required for luxury ecommerce.

## Typography

This design system utilizes a classic high-contrast pairing. **Playfair Display** provides the editorial authority for headlines, utilizing its elegant serifs to communicate craftsmanship. **Montserrat** is used for utility and body text, set with increased letter spacing to maintain a light, breathable feel.

For body text, use a lighter font weight (300) for large blocks of copy to maintain the minimalist aesthetic. All functional labels (buttons, price tags, navigation) should use the `label-caps` style to provide a structured, architectural contrast to the fluid serif headlines.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1440px max-width container on desktop, centered with generous 64px margins. 

The spacing rhythm is expansive. Vertical gaps between sections (`section-gap`) are intentionally large (120px+) to ensure each floral collection or brand message feels isolated and important. Grid systems should be 12 columns for desktop, but elements frequently span only the center 6 or 8 columns to create whitespace "breathing room" on the flanks.

## Elevation & Depth

To maintain a minimalist and "flat" luxury feel, this design system avoids traditional drop shadows. Depth is instead communicated through:

- **Tonal Layering:** Using the Soft Beige (#F5F5F0) against White (#FFFFFF) to define different functional areas.
- **Micro-borders:** 1px solid lines in very light grey (#E5E5E5) or Deep Black (#111111) for high-impact definition.
- **Glassmorphism (Overlay only):** When navigation menus or quick-view modals appear, use a high-refinement backdrop blur (20px) with a 90% white tint to maintain the "airy" atmosphere without losing the context of the floral photography beneath.

## Shapes

The design system adopts a **Sharp (0)** roundedness profile. All buttons, image containers, and input fields utilize 90-degree corners. This architectural sharpness provides a sophisticated contrast to the organic, flowing shapes of the flowers and the curves of the serif typography. The absence of border-radius signals a modern, high-fashion gallery aesthetic.

## Components

### Buttons
Primary buttons are solid Deep Black with White `label-caps` text. On hover, they transition smoothly to a 1px Black outline with Black text, or a subtle Gold background. The transition should be long (300ms) and ease-in-out to feel "luxurious."

### Product Cards
Cards feature ultra-generous padding (min 24px). Images should have a slight 1:1.25 portrait aspect ratio. Product titles are set in `headline-sm`, and prices are set in `label-caps`. Borders are avoided unless the background is the same color as the card, in which case a 1px #E5E5E5 border is used.

### Input Fields
Inputs are minimalist: a single 1px bottom border in Deep Black. Labels use `label-caps` and sit above the line. Focus states animate the bottom border to a subtle Gold color.

### Refined Iconography
Use thin-stroke (1pt) linear icons. Icons should never be filled. They act as quiet guides rather than focal points.

### Chips & Filters
Small, rectangular boxes with 1px black borders. Selected states utilize a solid Black fill with White text. Use for flower types, colors, and occasion filtering.