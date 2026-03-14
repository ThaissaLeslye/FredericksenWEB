//app/pages/home.ts
import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  authService = inject(AuthService);


  user = toSignal(this.authService.userState$);
  nomeUsuario = computed(() => this.user()?.displayName);

  logout() {
    this.authService.logout();
  }
}
