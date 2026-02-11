import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ControlContainer } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import type { ValidationError, DisabledReason, WithOptionalField } from '@angular/forms/signals';
import { MatFormFieldModule, SubscriptSizing } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorPipe } from '../../Utilities/validate-error.pipe';

@Component({
    selector: 'cab-input',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ValidationErrorPipe,
    ],
    template: `
    <mat-form-field class="cab-input" appearance="outline" [subscriptSizing]="subscriptSizing()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      @if (prefixIcon()) {
        <mat-icon matPrefix>{{ prefixIcon() }}</mat-icon>
      }
      @if (isSignalForm()) {
        <input
          matInput
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value() ?? ''"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [class.invalid]="invalid()"
          [attr.aria-invalid]="invalid()"
          (input)="onSignalInput($event)"
        />
      } @else {
        <input
          matInput
          [type]="type()"
          [placeholder]="placeholder()"
          [formControl]="formControl()!"
          [readonly]="isReadonly()"
        />
      }
      @if (suffixIcon()) {
        <mat-icon matSuffix>{{ suffixIcon() }}</mat-icon>
      }

      @if (!isSignalForm()) {
        @if (formControl() && formControl()!.touched && formControl()!.invalid) {
          <mat-error>
            {{ formControl()!.errors | validationError: errorMessages() }}
          </mat-error>
        }
      }
    </mat-form-field>
    @if (isSignalForm()) {
      @if (invalid()) {
        @for (error of errors(); track error) {
          <mat-error class="error">{{ error.message }}</mat-error>
        }
      }
    }
  `,
    styles: [
        `
      .cab-input {
        width: 100%;
      }
      .error {
        color: red; // replace with theme error color if available
        margin-left: var(--space-sm);
        margin-top: var(--space-xs);
      }
    `,
    ],
})
export class CabInput<T = string | number> implements FormValueControl<T | null> {
    private readonly controlContainer = inject(ControlContainer, { optional: true });

    /** @description Label of the input */
    label = input<string>('');
    /** @description Placeholder text for the input */
    placeholder = input<string>('');
    /** @description Type of the input */
    type = input<string>('text');
    /** @description Subscript sizing of the input */
    subscriptSizing = input<SubscriptSizing>('dynamic');
    /** @description Prefix icon name, shown before the input */
    prefixIcon = input<string | null>(null);
    /** @description Suffix icon name, shown after the input */
    suffixIcon = input<string | null>(null);
    /** @description FormControl for the input */
    control = input<FormControl<T> | string | null>(null);

    /** @description Optional error messages map. This is needed for reactive forms */
    errorMessages = input<Record<string, string>>({});
    /** @description Determine if the field is readonly */
    isReadonly = input<boolean>(false);

    //These below are for signal based forms
    //Implementing FormValueControl interface
    value = model<T | null>(null);
    disabled = input<boolean>(false);
    disabledReasons = input<readonly WithOptionalField<DisabledReason>[]>([]);
    readonly = input<boolean>(false);
    hidden = input<boolean>(false);
    invalid = input<boolean>(false);
    touched = input<boolean>(false);
    errors = input<readonly WithOptionalField<ValidationError>[]>([]);

    isSignalForm = computed<boolean>(() => this.control() === null);
    readonly formControl = computed<FormControl<T> | null>(() => {
        const controlInput = this.control();
        if (!controlInput) {
            return null;
        }
        if (typeof controlInput === 'string') {
            const control = this.controlContainer?.control?.get(controlInput);
            if (!control) {
                throw new Error(`FormControl with name '${controlInput}' not found in parent FormGroup.`);
            }
            return control as FormControl<T>;
        }
        return controlInput as FormControl<T>;
    });

    onSignalInput(event: Event): void {
        const target = event.target as HTMLInputElement | null;
        const raw = target?.value ?? '';
        if (this.type() === 'number') {
            const next = raw === '' ? null : Number(raw);
            this.value.set(next as T | null);
            return;
        }
        this.value.set((raw === '' ? null : raw) as T | null);
    }
}