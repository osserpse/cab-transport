import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
    name: 'validationError',
    standalone: true,
})
export class ValidationErrorPipe implements PipeTransform {
    transform(
        errors: ValidationErrors | null | undefined,
        errorMessages: Record<string, string>
    ): unknown {
        return errors
            ? Object.entries(errors)
                .map(([key, value]) => {
                    return typeof value === 'string' && value.length > 0
                        ? value
                        : value && errorMessages[key]
                            ? errorMessages[key]
                            : errorMessages['unknown'];
                })
                .join('. ')
            : '';
    }
}