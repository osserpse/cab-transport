import { ChangeDetectionStrategy, Component, computed, input, output, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MaterialIconName } from '../../types/material-icon-name';

/** Button variant determines the visual style */
export type CabButtonVariant = 'filled' | 'outlined' | 'text';

/**
 * CabButton - Unified button component supporting text buttons and icon-only buttons.
 *
 * Supports actions (click), internal navigation (routerLink), and external links (href).
 * Delegates all styling to Material Design 3.
 *
 * @example Text button
 * <cab-button text="Save" />
 * <cab-button text="Save" icon="save" [loading]="isSaving" />
 *
 * @example Icon-only button (ariaLabel required for accessibility)
 * <cab-button icon="favorite" ariaLabel="Add to favorites" />
 * <cab-button icon="delete" ariaLabel="Delete item" [loading]="isDeleting" />
 *
 * @example Badge with count
 * <cab-button text="Notifications" [badge]="5" />
 *
 * @example Badge dot (no count)
 * <cab-button icon="notifications" ariaLabel="Notifications" badge />
 *
 * @example Navigation
 * <cab-button text="Dashboard" icon="home" [link]="['/dashboard']" />
 * <cab-button text="Open CABAS" [href]="cabasLink" />
 * <cab-button icon="settings" ariaLabel="Settings" [link]="['/settings']" />
 *
 * @example With Cabla translation (use pipe)
 * <cab-button [text]="'Save' | cablaTranslate | async" />
 */
@Component({
    selector: 'cab-button',
    imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatBadgeModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Icon-only buttons -->
    @if (isIconOnly()) {
      @if (href()) {
        <a
          matIconButton
          [href]="href()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          <mat-icon
            [class.content-hidden]="loading()"
            [matBadge]="badgeContent()"
            [matBadgeHidden]="!hasBadge()"
            [matBadgeSize]="badgeSize()"
            matBadgePosition="above after"
            >{{ icon() }}</mat-icon
          >
        </a>
      } @else if (link()) {
        <a
          matIconButton
          [routerLink]="link()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          <mat-icon
            [class.content-hidden]="loading()"
            [matBadge]="badgeContent()"
            [matBadgeHidden]="!hasBadge()"
            [matBadgeSize]="badgeSize()"
            matBadgePosition="above after"
            >{{ icon() }}</mat-icon
          >
        </a>
      } @else {
        <button
          matIconButton
          type="button"
          [disabled]="isDisabled()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          <mat-icon
            [class.content-hidden]="loading()"
            [matBadge]="badgeContent()"
            [matBadgeHidden]="!hasBadge()"
            [matBadgeSize]="badgeSize()"
            matBadgePosition="above after"
            >{{ icon() }}</mat-icon
          >
        </button>
      }
    } @else {
      <!-- Text buttons (with optional icon) -->
      @if (href()) {
        <a
          [matButton]="variant()"
          [href]="href()"
          [matBadge]="badgeContent()"
          [matBadgeHidden]="!hasBadge()"
          [matBadgeSize]="badgeSize()"
          matBadgePosition="above after"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          [class.variant-filled]="variant() === 'filled'"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          @if (icon()) {
            <mat-icon [class.content-hidden]="loading()">{{ icon() }}</mat-icon>
          }
          <span class="label" [class.content-hidden]="loading()">{{ text() }}</span>
        </a>
      } @else if (link()) {
        <a
          [matButton]="variant()"
          [routerLink]="link()"
          [matBadge]="badgeContent()"
          [matBadgeHidden]="!hasBadge()"
          [matBadgeSize]="badgeSize()"
          matBadgePosition="above after"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          [class.variant-filled]="variant() === 'filled'"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          @if (icon()) {
            <mat-icon [class.content-hidden]="loading()">{{ icon() }}</mat-icon>
          }
          <span class="label" [class.content-hidden]="loading()">{{ text() }}</span>
        </a>
      } @else {
        <button
          [matButton]="variant()"
          type="button"
          [disabled]="isDisabled()"
          [matBadge]="badgeContent()"
          [matBadgeHidden]="!hasBadge()"
          [matBadgeSize]="badgeSize()"
          matBadgePosition="above after"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-busy]="loading() ? 'true' : null"
          [class.is-loading]="loading()"
          [class.variant-filled]="variant() === 'filled'"
          (click)="handleClick($event)"
        >
          @if (loading()) {
            <mat-spinner
              class="loading-spinner"
              diameter="20"
              aria-hidden="true"
              [attr.inert]="true"
            />
          }
          @if (icon()) {
            <mat-icon [class.content-hidden]="loading()">{{ icon() }}</mat-icon>
          }
          <span class="label" [class.content-hidden]="loading()">{{ text() }}</span>
        </button>
      }
    }
  `,
    styles: `
    :host {
      display: inline-block;
    }

    .is-loading {
      position: relative;
    }

    .loading-spinner {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .content-hidden {
      visibility: hidden;
    }

    /* Add border to badge for contrast on filled buttons */
    ::ng-deep .variant-filled .mat-badge-content {
      outline: 1px solid var(--mat-sys-on-primary);
    }

    /* Add border to badge on icon buttons for contrast against background */
    ::ng-deep mat-icon .mat-badge-content {
      outline: 1px solid var(--mat-sys-surface);
    }
  `,
})
export class CabButton implements OnInit {
    /** Button text label. If omitted, icon and ariaLabel are required. */
    readonly text = input<string | null>(null);

    /** Material icon name to display */
    readonly icon = input<MaterialIconName | null>(null);

    /**
     * Accessible label for the button. Required when text is not provided (icon-only buttons).
     * Can also be used to provide additional context for screen readers.
     */
    readonly ariaLabel = input<string | null>(null);

    /** Button variant: 'filled' | 'outlined' | 'text'. Only applies to text buttons. */
    readonly variant = input<CabButtonVariant>('filled');

    /** Whether the button is disabled (only applies to action buttons, not links) */
    readonly disabled = input<boolean>(false);

    /**
     * Badge content. Pass a number/string to show that value,
     * or use attribute without value (badge or badge="") to show a small dot.
     * @example [badge]="5" - shows "5"
     * @example badge - shows small dot
     */
    readonly badge = input<string | number | null>(null);

    /** Whether the button is in loading state */
    readonly loading = input<boolean>(false);

    /** Router link for internal navigation (renders as anchor with routerLink) */
    readonly link = input<string | string[] | null>(null);

    /** External URL for navigation (renders as anchor with href) */
    readonly href = input<string | null>(null);

    /** Emitted when button is clicked */
    readonly clicked = output<MouseEvent>();

    readonly isDisabled = computed(() => this.disabled() || this.loading());
    readonly hasBadge = computed(() => this.badge() !== null && this.badge() !== undefined);
    readonly badgeContent = computed(() => {
        const badge = this.badge();
        // Material hides badge with empty content, use zero-width space for dot display
        return badge === '' ? '\u200B' : (badge ?? '');
    });
    readonly badgeSize = computed(() => (this.badge() === '' ? 'small' : 'medium'));
    readonly isIconOnly = computed(() => !this.text() && !!this.icon());

    ngOnInit(): void {
        // Runtime validation: icon-only buttons require ariaLabel
        if (!this.text() && !this.ariaLabel()) {
            throw new Error(
                'cab-button: ariaLabel is required when text is not provided (icon-only buttons need accessible labels)'
            );
        }
        if (!this.text() && !this.icon()) {
            throw new Error('cab-button: either text or icon must be provided');
        }
    }

    handleClick(event: MouseEvent): void {
        this.clicked.emit(event);
    }
}