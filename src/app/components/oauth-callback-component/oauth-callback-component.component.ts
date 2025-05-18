// oauth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';


@Component({
  selector: 'app-oauth-callback',
  template: `<p>Connexion en cours...</p>`,
})
export class OAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.authService.exchangeGitHubCode(code).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.authService.setSession(res); // stocker token, user, etc.
          this.router.navigate(['/home']); // rediriger vers page protégée
        },
        error: (err) => {
          console.error('Login error', err);
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
