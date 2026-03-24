import { Component, inject,computed } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ui-avatar',
  imports: [],
  templateUrl: './ui-avatar.html',
  styleUrl: './ui-avatar.css',
})

export class UiAvatar {
  authService = inject(AuthService);

  user = toSignal(this.authService.userState$);
  nomeUsuario = computed(() => this.user()?.displayName);

  fotoUsuario = computed(() => this.user()?.photoURL);
}
