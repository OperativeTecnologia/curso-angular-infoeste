import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

import { ControlValueAccessorConnectorComponent } from '@forms/control-value-accessor-connector';
import { nextId } from '@utils/nextId';

@Component({
  standalone: true,
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  imports: [NgxCurrencyDirective, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputCurrencyComponent,
      multi: true
    }
  ]
})
export class InputCurrencyComponent extends ControlValueAccessorConnectorComponent {
  @Input() id = nextId();
  @Input() label: string;
  @Input() placeholder: string;
}
