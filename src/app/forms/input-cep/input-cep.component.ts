import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ZipCode } from '@interfaces/zip-code';
import { nextId } from '@utils/nextId';
import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector';
import { ZipCodeService } from './zipcode.service';

@Component({
  standalone: true,
  selector: 'app-input-cep',
  templateUrl: './input-cep.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxMaskDirective, ReactiveFormsModule],
  providers: [
    ZipCodeService,
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputCepComponent,
      multi: true
    }
  ]
})
export class InputCepComponent extends ControlValueAccessorConnectorComponent {
  private zipCodeService = inject(ZipCodeService);

  @Output() zipCodeSearched = new EventEmitter<ZipCode>();

  @Input() id = nextId();
  @Input() placeholder: string;
  @Input() label: string;

  lookingForZipCode = signal(false);

  async handleSearchCep() {
    const cep = this.control.value;

    if (cep && cep.length === 8) {
      this.lookingForZipCode.set(true);

      const cepResponse = await this.zipCodeService.search(cep).catch(() => null);
      if (cepResponse) {
        this.zipCodeSearched.emit(cepResponse);
      }

      this.lookingForZipCode.set(false);
    }
  }
}
