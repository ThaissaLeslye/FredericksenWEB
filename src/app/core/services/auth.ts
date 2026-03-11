import { Injectable, inject, NgZone } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  user, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private auth = inject(Auth); 
  private router = inject(Router);
  private ngZone = inject(NgZone);

  // Observable do usuário para o restante do app (Header, Guards, etc)
  user$ = user(this.auth);

  constructor() {
    // Iniciamos a checagem de redirecionamento assim que o serviço nasce
    //this.initAuth();
  }

  /**
   * Inicialização e captura de Redirect
   */
  public async initAuth() {
    console.log('🔍 [Auth] Iniciando monitoramento de autenticação...');
    
    try {
      // 1. Resolve o resultado do redirecionamento do Google (se houver)
      const result = await getRedirectResult(this.auth);
      if (result?.user) {
        console.log('✅ [Auth] Login recuperado via Redirect:', result.user.displayName);
        this.navigateToHome();
        return;
      }

      // 2. Se não foi redirect, observa o estado da sessão (usuário já logado antes)
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          console.log('🏠 [Auth] Sessão ativa detectada:', user.displayName);
          if (this.router.url.includes('login') || this.router.url === '/') {
            this.navigateToHome();
          }
        } else {
          console.log('👤 [Auth] Nenhum usuário logado.');
        }
      });

    } catch (error: any) {
      console.error('❌ [Auth] Erro na inicialização:', error.code);
      this.handleAuthError(error);
    }
  }



async loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  
  // Detecta se é celular/mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  try {
    // 💡 PASSO CRUCIAL: Garante que a sessão sobreviva ao redirect
    await setPersistence(this.auth, browserLocalPersistence);

    if (isMobile) {
      console.log('📱 Mobile detectado: Usando Redirect...');
      return await signInWithRedirect(this.auth, provider);
    } else {
      console.log('💻 Desktop detectado: Usando PopUp...');
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) this.navigateToHome();
    }
  } catch (error) {
    this.handleAuthError(error);
  }
}

  async logout() {
    try {
      await signOut(this.auth);
      console.log('🚪 Sessão encerrada.');
      this.ngZone.run(() => this.router.navigate(['/login']));
    } catch (error) {
      console.error('❌ Erro ao deslogar:', error);
    }
  }

  /**
   * Centraliza a navegação para Home garantindo que o Angular perceba a mudança
   */
  private navigateToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['/home']);
    });
  }

  private handleAuthError(error: any) {
    const errorMap: Record<string, string> = {
      'auth/popup-closed-by-user': 'Janela fechada pelo usuário.',
      'auth/cancelled-popup-request': 'Múltiplos popups abertos.',
      'auth/unauthorized-domain': 'Domínio não autorizado no Firebase Console!',
    };
    
    console.error('⚠️ Detalhes do erro:', error.code, error.message);
    const msg = errorMap[error.code] || 'Erro desconhecido na autenticação.';
    console.warn(msg);
  }
}