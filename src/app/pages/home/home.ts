import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(AuthService);


  // Criamos o nomeUsuario que você usou no HTML
  user = toSignal(this.authService.userState$);
  nomeUsuario = computed(() => this.user()?.displayName);

  logout() {
    this.authService.logout();
  }
}
