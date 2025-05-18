import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false; // Track if user is logged in

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('Token') || this.getSessionTokenFromCookies();

    if (token) {
      this.isAuthenticated = true; // Set to true if any valid session token exists
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
    } else {
      this.isAuthenticated = false;
    }

    // Redirect to NotFoundComponent if not authorized
    this.router.navigate(['/not-found']);
    return false; // Prevent access
  }

  /**
   * Fetch the active session token from cookies
   * @returns string | null
   */
  getSessionTokenFromCookies(): string | null {
    const match = document.cookie.match(new RegExp('(^| )Token=([^;]+)'));
    return match ? match[2] : null;
  }
}