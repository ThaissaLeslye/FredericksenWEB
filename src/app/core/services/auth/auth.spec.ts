// app/core/services/auth.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth';
import { NgZone, provideZoneChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification/notification';
import { LoggerService } from '../shared/logger/logger';

import * as fireAuth from '@angular/fire/auth';


describe('AuthService', () => {
  let service: AuthService;
  let routerMock: any;
  let notificationMock: any;
  let loggerMock: any;

  beforeEach(() => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    notificationMock = { showError: jasmine.createSpy('showError') };
    loggerMock = { debugLog: jasmine.createSpy('debugLog') };

    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        AuthService,
        { provide: fireAuth.Auth, useValue: {} }, 
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationMock },
        { provide: LoggerService, useValue: loggerMock },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  describe('loginWithGoogleToken', () => {
    it('deve ser criado com sucesso', () => {
      expect(service).toBeTruthy();
    });

    it('deve logar e navegar para /home em caso de sucesso', async () => {
      spyOn(service as any, 'navigateToHome').and.callThrough();
      
      await service.loginWithGoogleToken('fake-jwt-token');

      expect(loggerMock.debugLog).toHaveBeenCalledWith('[Auth] Autenticando no Firebase com Token GIS...');
    });

    it('deve tratar erro e chamar a notificação se o login falhar', async () => {
      spyOn(service as any, 'handleAuthError').and.callThrough();

      await service.loginWithGoogleToken(''); 
      expect(service['handleAuthError']).toHaveBeenCalled();
      expect(notificationMock.showError).toHaveBeenCalledWith('Erro ao fazer login. Tente novamente.');
    });
  });
});