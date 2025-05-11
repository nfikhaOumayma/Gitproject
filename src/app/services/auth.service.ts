import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8081/api/auth';

  SignUpAdmin(user : User):Observable<User>{
    return this.http.post<User>('http://localhost:8081/api/auth/signupadmin', user);
  }

  signIn(login: LogIn): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/signIn`, login).pipe(
      tap(response => {
        // Handle the JWT here (e.g., store it in local storage)
        localStorage.setItem('Token', response.token);
      })
    );
  }
}
