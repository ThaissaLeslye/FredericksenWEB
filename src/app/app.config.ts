import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment'; // Use o caminho geral, não o .development

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { AuthService } from './core/services/auth'; // Certifique-se que o caminho está correto

// 🛡️ Função que força o Angular a esperar o Firebase inicializar antes de rodar as rotas
export function initializeAuthApp(authService: AuthService) {
  return () => authService.initAuth(); 
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    provideAuth(() => getAuth()),

    // 🚀 O CORAÇÃO DA SOLUÇÃO:
    // Este provider garante que o AuthService capture o Redirect 
    // antes mesmo da primeira página aparecer.
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthApp,
      deps: [AuthService],
      multi: true
    },

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};