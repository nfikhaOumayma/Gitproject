import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: { label: string; link: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (token) {
      const userInfo = this.authService.getUserInfo(token);

      if (userInfo) {
        this.generateMenuItems(userInfo.roles);
      }
    }
  }

  generateMenuItems(roles: string[]): void {
    const roleBasedMenu = {
      ADMIN: [
        { label: 'Dashboard', link: '/admin/dashboard' },
        { label: 'Manage Users', link: '/admin/users' },
        { label: 'Reports', link: '/admin/reports' }
      ],
      EMPLOYEE: [
        { label: 'Profile', link: '/employee/profile' },
        { label: 'Tasks', link: '/employee/tasks' },
        { label: 'Leave Requests', link: '/employee/leaves' }
      ],
      GUEST: [
        { label: 'Home', link: '/guest/home' },
        { label: 'About Us', link: '/guest/about' },
        { label: 'Contact', link: '/guest/contact' }
      ]
    };

    // Dynamically add menu items based on roles
    roles.forEach((role) => {
      if (roleBasedMenu[role]) {
        this.menuItems.push(...roleBasedMenu[role]);
      }
    });
  }
}
