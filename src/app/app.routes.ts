import { Routes } from '@angular/router';
import { authGuard } from '../app/auth-guard';

export const routes: Routes = [
{ 
    path: '', 
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    canActivate: [authGuard] 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];