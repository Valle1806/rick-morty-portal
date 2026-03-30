import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="portal-loader-wrapper">
      <div class="portal-ring"></div>
      <div class="portal-label">{{ label }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() label: string = 'Escaneando multiverso...';
}