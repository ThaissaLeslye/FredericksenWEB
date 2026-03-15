import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoggerService {
  

  public debugLog(message: string, ...optionalParams: any[]) {
    if (isDevMode()) {
      console.log(message, ...optionalParams);
    }
  }
}
