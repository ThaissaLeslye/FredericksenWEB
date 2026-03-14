//app.ts
import { Component, signal, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  authService = inject(AuthService);

  protected readonly title = signal('web');
}
