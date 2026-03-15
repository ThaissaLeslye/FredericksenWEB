// app/app.spec.ts
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './core/services/auth/auth';
import { of } from 'rxjs';

describe('App Component', () => {
  beforeEach(async () => {
    const authServiceMock = {
      initAuth: jasmine.createSpy('initAuth').and.returnValue(Promise.resolve()),
      userState$: of(null)
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  it('deve criar o app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});