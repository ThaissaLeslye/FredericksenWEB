//auth.ts
import { Injectable, inject, NgZone } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  user, 
  signInWithCredential,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private auth = inject(Auth); 
  private router = inject(Router);
  private ngZone = inject(NgZone);

  // Observable exposed for guards and UI components
  user$ = user(this.auth);

  /**
   * Blocks Angular bootstrap until Firebase resolves redirect and initial state.
   * Does NOT handle routing.
   */
  public async initAuth(): Promise<void> {
    console.log('🔍 [Auth] Initializing and blocking bootstrap...');
    
  try {
        const redirectResult = await getRedirectResult(this.auth);
        console.log('🔄 [Auth] Redirect Result:', redirectResult ? 'User Found' : 'NULL');
      } catch (error: any) {
        console.error('❌ [Auth] Redirect error:', error.code, error.message);
      }

    // 2. Await the first definitive state from Firebase
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        console.log(user ? `🏠 [Auth] Session active: ${user.email}` : '👤 [Auth] No user logged in.');
        unsubscribe(); // Prevent memory leaks; we only need the first state
        resolve();     // Release the APP_INITIALIZER block
      });
    });
  }

  async logout() {
    try {
      await signOut(this.auth);
      console.log('🚪 Session ended.');
      this.ngZone.run(() => this.router.navigate(['/login']));
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  }

  private navigateToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['/home']);
    });
  }

  private handleAuthError(error: any) {
    console.error('⚠️ Error details:', error.code, error.message);
  }

/**
   * 🚀 Novo método: Recebe o token do Google Identity Services
   * e faz o login "silencioso" no Firebase.
   */
  async loginWithGoogleToken(idToken: string) {
    try {
      console.log('🔐 [Auth] Autenticando no Firebase com Token GIS...');
      
      // Cria uma credencial a partir do token recebido
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Faz o login no Firebase sem abrir popups nem redirecionar!
      const result = await signInWithCredential(this.auth, credential);
      
      if (result.user) {
        console.log('✅ [Auth] Login com GIS Sucesso:', result.user.email);
        this.navigateToHome();
      }
    } catch (error: any) {
      this.handleAuthError(error);
    }

  }

}