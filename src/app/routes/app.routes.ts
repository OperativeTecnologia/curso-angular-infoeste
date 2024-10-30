import { Routes } from '@angular/router';

import { ensureAuthentication } from '@guards/ensure-authentication.guard';
import { ensureUnauthenticated } from '@guards/ensure-unauthenticated.guard';

import { authenticatedRoutes } from './authenticated.routes';
import { unauthenticatedRoutes } from './unauthenticated.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivateChild: [ensureUnauthenticated()],
    children: unauthenticatedRoutes
  },
  {
    path: '',
    canActivateChild: [ensureAuthentication()],
    children: authenticatedRoutes
  },
  {
    path: '**',
    title: 'Página não encontrada | $NOME_SEU_SITE_TITLE',
    loadComponent: () => import('../pages/not-found/not-found.page').then(m => m.NotFoundPage)
  }
];
