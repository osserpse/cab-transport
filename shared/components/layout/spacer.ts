import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Flexible spacer component.
 * Expands to fill available space in a stack container.
 * Useful for pushing siblings apart.
 *
 * @example
 * ```html
 * <cab-hstack>
 *   <span>Left</span>
 *   <cab-spacer />
 *   <span>Right</span>
 * </cab-hstack>
 * ```
 */
@Component({
    selector: 'cab-spacer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '',
    host: {
        '[style.flex]': '"1 1 0"',
    },
})
export class Spacer { }