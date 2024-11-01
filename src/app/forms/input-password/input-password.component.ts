import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { nextId } from '@utils/nextId';
import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';

@Component({
  standalone: true,
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPasswordComponent,
      multi: true
    }
  ]
})
export class InputPasswordComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = nextId();
  @Input() placeholder: string;
  @Input() label: string;
  @Input() iconColor: string = null;

  eyePassword = signal(false);
}
