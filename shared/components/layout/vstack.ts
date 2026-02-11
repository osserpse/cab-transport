import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AlignHorizontal, JustifyVertical, SpacingSize, spacingStyle } from './types';

/**
 * Vertical stack layout component.
 * Arranges children in a column with configurable spacing and alignment.
 *
 * @example
 * ```html
 * <cab-vstack spacing="large" padding="medium">
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </cab-vstack>
 * ```
 */
@Component({
    selector: 'cab-vstack',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content />`,
    host: {
        '[style.display]': '"flex"',
        '[style.flexDirection]': '"column"',
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
export class VStack {
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
     * Distributes items along the vertical axis (main axis).
     *
     * `'top'` | `'center'` | `'bottom'` | `'space-between'`
     *
     * @default 'top'
     */
    readonly justify = input<JustifyVertical>('top');

    /**
     * Aligns items along the horizontal axis (cross axis).
     *
     * `'stretch'` | `'left'` | `'center'` | `'right'`
     *
     * @default 'stretch'
     */
    readonly align = input<AlignHorizontal>('stretch');

    /**
     * Allow items to wrap to multiple columns.
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

    /** @internal - Vertical distribution of items (main axis) */
    readonly justifyContent = computed(() => {
        const justify = this.justify();
        if (justify === 'top') return 'flex-start';
        if (justify === 'center') return 'center';
        if (justify === 'bottom') return 'flex-end';
        if (justify === 'space-between') return 'space-between';
        return 'flex-start';
    });

    /** @internal - Horizontal alignment of items (cross axis) */
    readonly alignItems = computed(() => {
        const align = this.align();
        if (align === 'stretch') return 'stretch';
        if (align === 'left') return 'flex-start';
        if (align === 'center') return 'center';
        if (align === 'right') return 'flex-end';
        return 'stretch';
    });

    /** @internal - Horizontal alignment of content group (cross axis, requires wrap) */
    readonly alignContent = computed(() => {
        const align = this.align();
        if (align === 'stretch') return 'stretch';
        if (align === 'left') return 'flex-start';
        if (align === 'center') return 'center';
        if (align === 'right') return 'flex-end';
        return 'stretch';
    });
}