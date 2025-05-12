import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from 'src/core/models/jwt-response';
import { User } from 'src/core/models/user';

export interface LogIn {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient ) { }
  private apiUrl = 'http://localhost:8088/api/auth';
  private apiUrl2 = '  http://localhost:8088/api/auth/signup/employee';

  SignUpAdmin(user : User):Observable<User>{
    return this.http.post<User>('http://localhost:8088/api/auth/signupadmin', user);
  }

  registerUser(user: User, roleName: string): Observable<any> {
    const url = `${this.apiUrl2}/${roleName}`;
    return this.http.post<User>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  signIn(login: LogIn): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/signIn`, login).pipe(
      tap(response => {
        // Handle the JWT here (e.g., store it in local storage)
        localStorage.setItem('Token', response.token);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('Token');
}
}
