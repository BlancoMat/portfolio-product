import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
  nombre: string;
  email: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  send(payload: ContactPayload): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${environment.apiUrl}/contact`, payload);
  }
}
