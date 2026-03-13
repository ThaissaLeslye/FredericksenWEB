//login.ts
import { Component, inject, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { environment } from '../../../environments/environment';
import { GoogleAuthScriptService } from '../../core/services/google-auth-script';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  authService = inject(AuthService);
  googleAuthScriptService = inject(GoogleAuthScriptService);

  async ngAfterViewInit() {
    try {
      console.log('Solicitando o carregamento do script do Google...');
      await this.googleAuthScriptService.loadScript();

      this.renderGoogleButton();
    } catch (error) {
      console.error('[ERROR] Falha ao carregar o script do Google:', error);
    }
  }

  private renderGoogleButton() {
    console.log('Google GIS encontrado. Renderizando botão...');
    
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: google.accounts.id.CredentialResponse) => this.handleGoogleResponse(response),
      auto_select: false,
      cancel_on_tap_outside: true
    });

    const btnContainer = document.getElementById('google-btn-container');
    if (btnContainer) {
      google.accounts.id.renderButton(
        btnContainer,
        { theme: 'outline', size: 'large', width: 280, locale: 'pt-BR', type: 'standard' }
      );
    } else {
      console.error('[ERROR] Div container do botão não encontrada no HTML!');
    }
  }

  handleGoogleResponse(response: google.accounts.id.CredentialResponse) {
    console.log('Token recebido do GIS! Repassando para o Firebase...');
    this.authService.loginWithGoogleToken(response.credential);
  }
}