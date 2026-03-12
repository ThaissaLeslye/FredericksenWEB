//auth-guards.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../app/core/services/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🛡️ [Guard] Verifying access for:', state.url);

  return authService.user$.pipe(
    take(1), // Take the first emission, which is now guaranteed to be accurate
    map(user => {
      if (user) {
        console.log('✅ [Guard] Access granted for:', user.email);
        return true; 
      } else {
        console.warn('❌ [Guard] Access denied. Redirecting to login.');
        return router.parseUrl('/login');
      }
    })
  );
};