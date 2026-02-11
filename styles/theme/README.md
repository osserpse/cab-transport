# Theme System

This folder contains the Material Design 3 (M3) theming system for the application.

## Structure

```
theme/
├── _theme.css      # Angular Material component library tokens
├── colors/         # Figma-generated M3 color schemes
│   ├── light.css
│   ├── dark.css
│   ├── light-mc.css   (medium contrast)
│   ├── dark-mc.css    (medium contrast)
│   ├── light-hc.css   (high contrast)
│   └── dark-hc.css    (high contrast)
└── README.md
```

## Colors Folder

The `colors/` folder contains CSS files exported from the **Material Theme Builder**.

### Sources

You can generate theme colors using either:

- **Figma Plugin:** https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder
- **Web App:** https://material-foundation.github.io/material-theme-builder/

Both tools produce the same CSS output format.

### How to Update Colors

1. Open the Material Theme Builder (Figma plugin or web app)
2. Configure your theme colors (primary, secondary, tertiary, etc.)
3. Export using **Web (CSS)** format
4. Replace the files in `colors/` with the exported CSS files
5. Ensure the class names match:
   - `.light` / `.dark` for normal contrast
   - `.light-medium-contrast` / `.dark-medium-contrast` for medium contrast
   - `.light-high-contrast` / `.dark-high-contrast` for high contrast

**Important:** Do not manually edit files in `colors/`. They should be regenerated from the theme builder when design changes are needed.

## \_theme.css

This file serves two purposes:

1. **Imports** all Figma-generated color schemes
2. **Maps** Material Design 3 variables (`--md-sys-color-*`) to Angular Material naming convention (`--mat-sys-*`)

The Angular Material component library expects `--mat-sys-*` CSS custom properties. The Figma export uses `--md-sys-color-*` naming. The mapping layer in `_theme.css` bridges this gap.

### Non-Color Systems

`_theme.css` also defines:

- **Typography** - Font families, sizes, weights, line heights
- **Elevation** - Box shadow levels (level0 through level5)
- **Shape** - Border radius tokens (corner-small, corner-medium, etc.)
- **State** - Opacity values for hover, focus, pressed states

These are not exported from Figma and are maintained manually.

## Theme Service

The theme is applied via CSS classes on the `<html>` element, managed by `ThemeService` (`@core/theme.service.ts`).

### Supported Preferences

**Theme:** `light` | `dark` | `auto` (follows OS `prefers-color-scheme`)

**Contrast:** `normal` | `medium` | `high` | `auto` (follows OS `prefers-contrast`)

### Behavior

1. **Default:** Respects OS/browser preferences via media queries
2. **Override:** User can explicitly set theme and contrast in the app
3. **Persistence:** Preferences saved to localStorage and synced across tabs

## CSS Variable Reference

### Color Variables

| Angular Material (`--mat-sys-*`) | Figma Export (`--md-sys-color-*`) |
| -------------------------------- | --------------------------------- |
| `--mat-sys-primary`              | `--md-sys-color-primary`          |
| `--mat-sys-on-primary`           | `--md-sys-color-on-primary`       |
| `--mat-sys-surface`              | `--md-sys-color-surface`          |
| `--mat-sys-on-surface`           | `--md-sys-color-on-surface`       |
| ...                              | ...                               |

See `_theme.css` for the complete mapping.
