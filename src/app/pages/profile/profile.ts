import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiAvatar } from '../../components/ui-avatar/ui-avatar';

@Component({
  selector: 'app-profile',
  imports: [UiAvatar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile {
  authService = inject(AuthService);

  user = toSignal(this.authService.userState$);
  nomeUsuario = computed(() => this.user()?.displayName);

  emailUsuario = computed(() => this.user()?.email);

  logout() {
    this.authService.logout();
  }
}
