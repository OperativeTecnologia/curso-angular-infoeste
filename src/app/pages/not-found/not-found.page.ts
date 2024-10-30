import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {}
