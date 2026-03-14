/// <reference types="google.accounts" />

// app/pages/login/login.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../core/services/auth/auth';
import { GoogleAuthScriptService } from '../../core/services/auth/google-auth-script';


describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceMock: any;
  let googleAuthScriptMock: any;

  beforeEach(async () => {
    authServiceMock = {
      loginWithGoogleToken: jasmine.createSpy('loginWithGoogleToken')
    };

    googleAuthScriptMock = {
      loadScript: jasmine.createSpy('loadScript').and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      imports: [Login], // Como é um standalone component, vai nos imports
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: GoogleAuthScriptService, useValue: googleAuthScriptMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve solicitar o carregamento do script do Google no ngAfterViewInit', async () => {
    await component.ngAfterViewInit();
    
    expect(googleAuthScriptMock.loadScript).toHaveBeenCalled();
  });

  it('deve repassar o token recebido do GIS para o AuthService', () => {
    const mockResponse = { credential: 'super-secret-token' } as google.accounts.id.CredentialResponse;
    
    component.handleGoogleResponse(mockResponse);
    
    expect(authServiceMock.loginWithGoogleToken).toHaveBeenCalledWith('super-secret-token');
  });
});