import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { UserTypeLabel } from '@enums/user-type';
import { AdminRepository } from '@repositories/admin.repository';

@Component({
  standalone: true,
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  imports: [RouterLink]
})
export class AdminListPage {
  private adminRepository = inject(AdminRepository);

  UserTypeLabel = UserTypeLabel;

  query = injectQuery(() => ({
    queryKey: ['admins'],
    queryFn: () => this.adminRepository.getAll()
  }));
}
