//auth-guards.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../app/core/services/auth/auth';
import { map, take, filter } from 'rxjs';
import { LoggerService } from './core/services/shared/logger/logger';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggerService = inject(LoggerService);

  loggerService.debugLog('[Guard] Verifying access for:', state.url);

  return authService.userState$.pipe(
    filter(userState => userState !== undefined),
    take(1),
    map(userState => {
      if (userState) {
        loggerService.debugLog('[Guard] Access granted for:', userState.email);
        return true; 
      } else {
        console.warn('[Guard] Access denied. Redirecting to login.');
        return router.parseUrl('/login');
      }
    })
  );
};