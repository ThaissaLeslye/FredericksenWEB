//app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../app/auth-guard';

export const routes: Routes = [ 
  { 
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
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
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];