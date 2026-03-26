//app.config.ts
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment'; 
import { provideHttpClient } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { AuthService } from './core/services/auth/auth'; 


export function initializeAuthApp(authService: AuthService) {
  return () => authService.initAuth(); 
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(),

    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    provideAuth(() => getAuth()),

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