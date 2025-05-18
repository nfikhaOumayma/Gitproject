import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from 'src/core/models/jwt-response';
import { User } from 'src/core/models/user';

export interface LogIn {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/api/auth';
  private apiUrl2 = 'http://localhost:8088/api/auth/signup/employee';
  private decodedRoles: string[] = []; // 🔵 Global roles list

  constructor(private http: HttpClient) {}

  SignUpAdmin(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8088/api/auth/signupadmin',
      user
    );
  }

  registerUser(user: User, roleName: string): Observable<any> {
    const url = `${this.apiUrl2}/${roleName}`;
    return this.http.post<User>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  signIn(login: LogIn): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/signIn`, login).pipe(
      tap((response) => {
        localStorage.setItem('Token', response.token);
        this.decodeAndStoreRoles(response.token); // 🔵 Decode once and store roles
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  decodeToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  // 🔵 Decode token once and extract roles
  private decodeAndStoreRoles(token: string): void {
    const decoded = this.decodeToken(token);
    if (decoded && decoded.roles) {
      this.decodedRoles = decoded.roles;
      console.log('Roles stored:', this.decodedRoles);
    }
  }

  // 🔵 Call this on app init (if token exists)
  initializeRolesFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.decodeAndStoreRoles(token);
    }
  }

  // ✅ Use this method to check admin status from global roles
  isAdmin(): boolean {
    return this.decodedRoles.includes('ADMIN');
  }

  getUserInfo(): any {
    const token = this.getToken();
    const decoded = token ? this.decodeToken(token) : null;
    if (decoded) {
      return {
        username: decoded.sub,
        email: decoded.email,
        roles: decoded.roles || [],
        id: decoded.id,
      };
    }
    return null;
  }

  // auth.service.ts
  exchangeGitHubCode(code: string) {
    return this.http.get<any>(
      `http://localhost:8088/oauth/github/token?code=${code}`
    );
  }

  setSession(data: any) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
}
