//profile.ts
import { Component, inject, computed, OnInit, signal} from '@angular/core';
import { AuthService } from '../../core/services/auth/auth';
import { DataService } from '../../core/services/shared/data/data';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiAvatar } from '../../components/ui-avatar/ui-avatar';
import { UiCard } from '../../components/ui-card/ui-card';
import { CardSection } from '../../components/ui-card/ui-card.model';

@Component({
  selector: 'app-profile',
  imports: [UiAvatar, UiCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {
  private dataService = inject(DataService);
  authService = inject(AuthService);

  profileData = signal<CardSection[]>([]);

  ngOnInit() {
    this.dataService.getJsonData<{ profileData: CardSection[] }>('profile-data')
      .subscribe({
        next: (response) => {
          this.profileData.set(response.profileData);
        },
        error: (err) => console.error('Erro ao carregar banco JSON:', err)
      });
    }

  user = toSignal(this.authService.userState$);
  nomeUsuario = computed(() => this.user()?.displayName);

  emailUsuario = computed(() => this.user()?.email);

  logout() {
    this.authService.logout();
  }

  updateProfileData(event: { index: number; newValue: string | string[] }) {
    console.log('Recebendo novos dados do componente de UI:', event);

    this.profileData.update(currentData => {
      const newData = [...currentData];
      
      newData[event.index] = {
        ...newData[event.index],
        value: event.newValue
      };

      return newData;
    });

    this.simulateBackendUpdate(event.newValue);
  }

  private simulateBackendUpdate(data: any) {
    console.log('Simulando salvamento no banco de dados...', data);
  }
}
