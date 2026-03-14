import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  matSnackBar = inject(MatSnackBar);


  showError(message: string) {
    this.matSnackBar.open(message, 'OK', { duration: 5000 });
  }
}
