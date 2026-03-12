//login.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  authService = inject(AuthService);

    login() {
      console.log('Botão de login pressionado!');
      this.authService.loginWithGoogle();
    }
}
