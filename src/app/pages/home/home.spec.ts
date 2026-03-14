// app/pages/home/home.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { AuthService } from '../../core/services/auth';
import { of } from 'rxjs'; // Para simular o observable

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      userState$: of({ email: 'gato@fredericksen.com' }),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});