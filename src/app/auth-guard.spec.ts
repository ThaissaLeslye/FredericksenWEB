// app/auth-guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from './core/services/auth';
import { LoggerService } from './core/services/logger';
import { BehaviorSubject, Observable } from 'rxjs';


describe('authGuard', () => {
  let authServiceMock: Partial<AuthService>;
  let loggerServiceMock: any;
  let routerMock: any;
  let userStateSubject: BehaviorSubject<any>;

  const dummyUrlTree = {} as UrlTree;

  beforeEach(() => {
    userStateSubject = new BehaviorSubject<any>(undefined);

    authServiceMock = {
      userState$: userStateSubject.asObservable()
    };

    loggerServiceMock = {
      debugLog: jasmine.createSpy('debugLog')
    };

    routerMock = {
      parseUrl: jasmine.createSpy('parseUrl').and.returnValue(dummyUrlTree)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: LoggerService, useValue: loggerServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  const runGuard = () => {
    return TestBed.runInInjectionContext(() => 
      authGuard({} as any, { url: '/home' } as any)
    ) as Observable<boolean | UrlTree>;
  };

  it('deve permitir o acesso (retornar true) se o usuário estiver logado', (done) => {
    userStateSubject.next({ email: 'teste@teste.com' });

    runGuard().subscribe(result => {
      expect(result).toBeTrue();
      expect(loggerServiceMock.debugLog).toHaveBeenCalledWith('[Guard] Access granted for:', 'teste@teste.com');
      done();
    });
  });

  it('deve negar o acesso e redirecionar (retornar UrlTree) se NÃO houver usuário', (done) => {
    userStateSubject.next(null);

    runGuard().subscribe(result => {
      expect(result).toBe(dummyUrlTree); 
      expect(routerMock.parseUrl).toHaveBeenCalledWith('/login');
      done();
    });
  });
});