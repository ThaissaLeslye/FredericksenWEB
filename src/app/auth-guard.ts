import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../app/core/services/auth'; // Verifique se este caminho está 100% correto
import { map, take, filter } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🛡️ [Guard] Verificando acesso para:', state.url);

  return authService.user$.pipe(
    // 1. Aguarda até que o Firebase deixe de ser 'undefined' (inicializando)
    // Com o APP_INITIALIZER, isso deve ser instantâneo.
    filter(user => user !== undefined), 
    
    // 2. Pega apenas o primeiro valor (logado ou null) e encerra a inscrição
    take(1), 
    
    map(user => {
      if (user) {
        console.log('✅ [Guard] Acesso permitido para:', user.email);
        return true; 
      } else {
        console.warn('❌ [Guard] Acesso negado. Usuário não autenticado.');
        // Redireciona para o login e salva a URL que o usuário tentou acessar
        return router.parseUrl('/login');
      }
    })
  );
};