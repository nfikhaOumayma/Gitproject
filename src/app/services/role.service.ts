import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/core/models/role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8088/api/role/getAllRoles';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllRoles(): Observable<Role[]> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Role[]>(this.apiUrl, { headers });
  }
} 