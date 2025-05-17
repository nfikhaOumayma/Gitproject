import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('Token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded); // Log the decoded token

        // Check if roles exist and include 'ADMIN'
        const roles = decoded.roles || [];
        console.log('Roles:', roles);

        if (roles.includes('ADMIN')) {
          return true; // Allow access to the route
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }

    // Redirect to NotFoundComponent if not authorized
    this.router.navigate(['/not-found']);
    return false; // Prevent access
  }
}