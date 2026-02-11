/**
 * Available spacing sizes that map to CSS custom properties.
 * - `none`: No spacing (0)
 * - `small`: Small spacing (--space-sm) - 8px
 * - `medium`: Medium spacing (--space-md) - 16px
 * - `large`: Large spacing (--space-lg) - 24px
 * - `extra-large`: Extra large spacing (--space-xl) - 48px
 */
export type SpacingSize = 'none' | 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Vertical axis distribution (VStack main axis).
 * Controls how items are distributed along the vertical axis.
 */
export type JustifyVertical = 'top' | 'center' | 'bottom' | 'space-between';

/**
 * Horizontal axis distribution (HStack main axis).
 * Controls how items are distributed along the horizontal axis.
 */
export type JustifyHorizontal = 'left' | 'center' | 'right' | 'space-between';

/**
 * Vertical axis alignment (HStack cross axis).
 * Controls how items are aligned along the vertical axis.
 */
export type AlignVertical = 'stretch' | 'top' | 'center' | 'bottom';

/**
 * Horizontal axis alignment (VStack cross axis).
 * Controls how items are aligned along the horizontal axis.
 */
export type AlignHorizontal = 'stretch' | 'left' | 'center' | 'right';

/** @internal Maps SpacingSize to CSS variable suffix */
const spacingSizeMap: Record<SpacingSize, string | null> = {
    none: null,
    small: 'sm',
    medium: 'md',
    large: 'lg',
    'extra-large': 'xl',
};

/**
 * Converts a SpacingSize to a CSS custom property value.
 * @param size - The spacing size token
 * @returns CSS var() string or null if no size specified
 */
export function spacingStyle(size: SpacingSize | undefined): string | null {
    if (!size || size === 'none') return null;
    const cssVar = spacingSizeMap[size];
    if (!cssVar) return null;
    return `var(--space-${cssVar})`;
}