import { inject, Pipe, PipeTransform } from '@angular/core';
import { NgxMaskService } from 'ngx-mask';

@Pipe({
  standalone: true,
  name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {
  private ngxMaskService = inject(NgxMaskService);

  transform(value: string): unknown {
    return this.ngxMaskService.applyMask(value, value?.length === 10 ? '(00) 0000-0000' : '(00) 00000-0000');
  }
}
