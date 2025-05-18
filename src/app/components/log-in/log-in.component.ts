import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService, LogIn } from '../../../core/services/auth.service';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Token } from '@angular/compiler';
import { JwtResponse } from 'src/core/models/jwt-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  imports: [
    FormsModule,
    ProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  standalone: true,
})
export class LogInComponent {
  loginForm: FormGroup;
  userInfo: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router // Add Router here
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  loading: boolean = false;
  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      const loginData: LogIn = this.loginForm.value;

      this.authService.signIn(loginData).subscribe({
        next: (response: JwtResponse) => {
          // this.loading = false;
          // console.log('Login response:', response);

          // localStorage.setItem('Token', response.token);

          // this.userInfo = this.authService.getUserInfo(response.token);
          // console.log(this.userInfo);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'Welcome!',
          });

          // Navigate to /createUser after successful login
          this.router.navigate(['/createUser']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials!',
          });
          this.loading = false;
        },
      });
    } else {
      localStorage.removeItem('Token');
      this.loading = false;
      this.loginForm.reset();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Form is invalid!',
      });
    }
  }

  loginWithGitHub() {
    window.location.href = 'http://localhost:8088/oauth/github/login';
  }
}
