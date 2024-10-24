import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.BASE_URL;
  headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: environment.TOKEN,
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> | any {
    return this.http.get<User[]>(this.baseUrl, { headers: this.headers });
  }

  getById(id: string): Observable<any> | any {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  create(body: any): Observable<any> | any {
    return this.http.post(this.baseUrl, body, { headers: this.headers });
  }

  update(id: string, payload: any): Observable<any> | any {
    return this.http.patch(`${this.baseUrl}/${id}`, payload, {
      headers: this.headers,
    });
  }

  delete(id: string): Observable<any> | any {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}
