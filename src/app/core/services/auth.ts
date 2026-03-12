//auth.ts
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

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      await setPersistence(this.auth, browserLocalPersistence);
      
      if (isMobile || !isMobile) {
        console.log('📱 Mobile detected: Using Redirect...');
        await signInWithRedirect(this.auth, provider);
      } else {
        console.log('💻 Desktop detected: Using PopUp...');
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
}