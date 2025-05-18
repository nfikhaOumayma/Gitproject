import { Component } from '@angular/core';
import { RoleUser } from 'src/core/models/role';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  roles: string[] = [];
  menuItems: { label: string; link: string }[] = [];

  roleMenus = {
    ADMIN: [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: 'Users', link: '/admin/users' },
    ],
    EMPLOYEE: [
      { label: 'Tasks', link: '/employee/tasks' },
      { label: 'Profile', link: '/employee/profile' },
    ],
    GUEST: [
      { label: 'Login', link: '/login' },
      { label: 'Register', link: '/register' },
    ]
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize roles from token (optional, if you call it somewhere else on app startup)
    this.authService.initializeRolesFromToken();

    // Get roles from AuthService
    this.roles = this.authService.getUserRoles();

    // Choose menu based on roles priority
    if (this.roles.includes('ADMIN')) {
      this.menuItems = this.roleMenus.ADMIN;
    } else if (this.roles.includes('EMPLOYEE')) {
      this.menuItems = this.roleMenus.EMPLOYEE;
    } else {
      this.menuItems = this.roleMenus.GUEST;
    }
  } }