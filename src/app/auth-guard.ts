//auth-guards.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../app/core/services/auth';
import { map, take } from 'rxjs';
import { LoggerService } from './core/services/logger';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggerService = inject(LoggerService);

  loggerService.debugLog('[Guard] Verifying access for:', state.url);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        loggerService.debugLog('[Guard] Access granted for:', user.email);
        return true; 
      } else {
        console.warn('[Guard] Access denied. Redirecting to login.');
        return router.parseUrl('/login');
      }
    })
  );
};