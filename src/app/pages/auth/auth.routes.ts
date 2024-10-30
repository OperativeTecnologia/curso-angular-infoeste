import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Login | $NOME_SEU_SITE_TITLE',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'forgot-password',
    title: 'Recuperar a senha | $NOME_SEU_SITE_TITLE',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'reset-password',
    title: 'Redefinir a senha | $NOME_SEU_SITE_TITLE',
    loadComponent: () => import('./reset-password/reset-password.page').then(m => m.ResetPasswordPage)
  }
];
