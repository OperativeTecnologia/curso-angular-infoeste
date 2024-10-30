import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-default-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [NgbTooltipModule]
})
export class DashboardPage {}
