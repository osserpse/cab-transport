import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AlignVertical, JustifyHorizontal, SpacingSize, spacingStyle } from './types';

/**
 * Horizontal stack layout component.
 * Arranges children in a row with configurable spacing and alignment.
 *
 * @example
 * ```html
 * <cab-hstack spacing="small">
 *   <mat-icon>search</mat-icon>
 *   <span>Search</span>
 * </cab-hstack>
 * ```
 */
@Component({
    selector: 'cab-hstack',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content />`,
    host: {
        '[style.display]': '"flex"',
        '[style.flexDirection]': '"row"',
        '[style.flexWrap]': 'flexWrap()',
        '[style.gap]': 'spacingStyle()',
        '[style.padding]': 'paddingStyle()',
        '[style.paddingInline]': 'paddingXStyle()',
        '[style.paddingBlock]': 'paddingYStyle()',
        '[style.justifyContent]': 'justifyContent()',
        '[style.alignItems]': 'alignItems()',
        '[style.alignContent]': 'alignContent()',
        '[style.height]': 'computedHeight()',
        '[style.width]': 'computedWidth()',
        '[style.boxSizing]': '"border-box"',
    },
})
export class HStack {
    /**
     * Space between child elements.
     *
     * `'none'` | `'small'` | `'medium'` | `'large'` | `'extra-large'`
     *
     * @default 'medium'
     */
    readonly spacing = input<SpacingSize>('medium');

    /**
     * Padding on all sides.
     *
     * `'none'` | `'small'` | `'medium'` | `'large'` | `'extra-large'`
     */
    readonly padding = input<SpacingSize>();

    /**
     * Horizontal padding (left and right).
     *
     * `'none'` | `'small'` | `'medium'` | `'large'` | `'extra-large'`
     */
    readonly paddingX = input<SpacingSize>();

    /**
     * Vertical padding (top and bottom).
     *
     * `'none'` | `'small'` | `'medium'` | `'large'` | `'extra-large'`
     */
    readonly paddingY = input<SpacingSize>();

    /**
     * Distributes items along the horizontal axis (main axis).
     *
     * `'left'` | `'center'` | `'right'` | `'space-between'`
     *
     * @default 'left'
     */
    readonly justify = input<JustifyHorizontal>('left');

    /**
     * Aligns items along the vertical axis (cross axis).
     *
     * `'stretch'` | `'top'` | `'center'` | `'bottom'`
     *
     * @default 'center'
     */
    readonly align = input<AlignVertical>('center');

    /**
     * Allow items to wrap to multiple rows.
     * @default false
     */
    readonly wrap = input(false, { transform: (v: boolean | string) => v === '' || v === true });

    /**
     * Sets height to 100%.
     * @default false
     */
    readonly fillHeight = input(false, {
        transform: (v: boolean | string) => v === '' || v === true,
    });

    /**
     * Sets width to 100%.
     * @default false
     */
    readonly fillWidth = input(false, { transform: (v: boolean | string) => v === '' || v === true });

    /**
     * Sets both width and height to 100%.
     * @default false
     */
    readonly fill = input(false, { transform: (v: boolean | string) => v === '' || v === true });

    /** @internal */
    readonly flexWrap = computed(() => (this.wrap() ? 'wrap' : 'nowrap'));
    /** @internal */
    readonly spacingStyle = computed(() => spacingStyle(this.spacing()));
    /** @internal */
    readonly paddingStyle = computed(() => spacingStyle(this.padding()));
    /** @internal */
    readonly paddingXStyle = computed(() => spacingStyle(this.paddingX()));
    /** @internal */
    readonly paddingYStyle = computed(() => spacingStyle(this.paddingY()));

    /** @internal */
    readonly computedHeight = computed(() => {
        if (this.fill() || this.fillHeight()) return '100%';
        return null;
    });

    /** @internal */
    readonly computedWidth = computed(() => {
        if (this.fill() || this.fillWidth()) return '100%';
        return null;
    });

    /** @internal - Horizontal distribution of items (main axis) */
    readonly justifyContent = computed(() => {
        const justify = this.justify();
        if (justify === 'left') return 'flex-start';
        if (justify === 'center') return 'center';
        if (justify === 'right') return 'flex-end';
        if (justify === 'space-between') return 'space-between';
        return 'flex-start';
    });

    /** @internal - Vertical alignment of items (cross axis) */
    readonly alignItems = computed(() => {
        const align = this.align();
        if (align === 'stretch') return 'stretch';
        if (align === 'top') return 'flex-start';
        if (align === 'center') return 'center';
        if (align === 'bottom') return 'flex-end';
        return 'center';
    });

    /** @internal - Vertical alignment of content group (cross axis, for wrapped content) */
    readonly alignContent = computed(() => {
        const align = this.align();
        if (align === 'stretch') return 'stretch';
        if (align === 'top') return 'flex-start';
        if (align === 'center') return 'center';
        if (align === 'bottom') return 'flex-end';
        return 'center';
    });
}