import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Center layout component.
 * Centers content both horizontally and vertically within its parent.
 * Always fills 100% of parent width and height.
 *
 * @example
 * ```html
 * <cab-center>
 *   <mat-spinner diameter="32"></mat-spinner>
 * </cab-center>
 * ```
 */
@Component({
    selector: 'cab-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content />`,
    host: {
        '[style.display]': '"flex"',
        '[style.justifyContent]': '"center"',
        '[style.alignItems]': '"center"',
        '[style.height]': '"100%"',
        '[style.width]': '"100%"',
        '[style.boxSizing]': '"border-box"',
    },
})
export class Center { }