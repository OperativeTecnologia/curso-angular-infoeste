import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShortNamePipe } from '@burand/angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { LucideAngularModule } from 'lucide-angular';

import { SessionContext } from '@contexts/session.context';
import { SideBarContext } from '@contexts/side-bar-context';
import { AvatarPipe } from '@pipes/avatar.pipe';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDropdownModule, LucideAngularModule, ShortNamePipe, AvatarPipe, AsyncPipe]
})
export class TopbarComponent {
  private router = inject(Router);
  private sessionContext = inject(SessionContext);
  public useSideBar = inject(SideBarContext);
  private queryClient = injectQueryClient();

  currentUser = this.sessionContext.getFirebaseUser();

  async logout() {
    await this.sessionContext.logout();
    await this.router.navigateByUrl('/login');
    await this.queryClient.invalidateQueries();
  }
}
