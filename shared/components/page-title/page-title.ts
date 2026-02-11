import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HStack } from '../layout/hstack';

@Component({
    selector: 'app-page-title',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconModule, HStack],
    template: `
    <cab-hstack spacing="small" align="center">
      <mat-icon>{{ icon() }}</mat-icon>
      <h1>{{ title() }}</h1>
    </cab-hstack>
  `,
    styles: `
    h1 {
      margin: 0;
    }
  `,
})
export class PageTitle {
    icon = input.required<string>();
    title = input.required<string>();
}