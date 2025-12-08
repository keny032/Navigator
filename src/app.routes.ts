
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'procedures',
    loadComponent: () => import('./components/procedures/procedure-list/procedure-list.component').then(c => c.ProcedureListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'procedures/:id',
    loadComponent: () => import('./components/procedures/procedure-detail/procedure-detail.component').then(c => c.ProcedureDetailComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'offline',
    loadComponent: () => import('./components/offline/offline-list/offline-list.component').then(c => c.OfflineListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'assistant',
    loadComponent: () => import('./components/assistant/assistant.component').then(c => c.AssistantComponent),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
