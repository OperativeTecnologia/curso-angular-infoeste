import { Routes } from '@angular/router';

export const authenticatedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layouts/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard | $NOME_SEU_SITE_TITLE',
        loadComponent: () => import('../pages/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'admins',
        children: [
          {
            path: '',
            title: 'Admin | $NOME_SEU_SITE_TITLE',
            loadComponent: () => import('../pages/admins/admin-list/admin-list.page').then(m => m.AdminListPage)
          },
          {
            path: 'create',
            title: 'Cadastrar Admin | $NOME_SEU_SITE_TITLE',
            loadComponent: () => import('../pages/admins/admin-create/admin-create.page').then(m => m.AdminPage)
          }
        ]
      }
    ]
  }
];
