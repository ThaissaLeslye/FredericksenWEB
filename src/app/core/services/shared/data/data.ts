import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient); 

  /**
   * Método Genérico para buscar qualquer JSON
   * @param fileName 
   */
  getJsonData<T>(fileName: string): Observable<T> {
    const path = `data/${fileName}.json`;
    return this.http.get<T>(path);
  }
}