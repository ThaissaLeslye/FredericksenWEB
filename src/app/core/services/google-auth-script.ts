import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GoogleAuthScriptService {
  private document = inject(DOCUMENT);

  loadScript(): Promise<void> {
    return new Promise ((resolve, reject) => {

      const scriptExistente = this.document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (scriptExistente) {
          return resolve();
        }

      const script = this.document.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();

      script.onerror = () => reject('Erro ao carregar script do Google.');

      this.document.head.appendChild(script);
    });
  };
};
