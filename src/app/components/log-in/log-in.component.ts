import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService, LogIn } from '../../../core/services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { JwtResponse } from 'src/core/models/jwt-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  standalone: true,
})
export class LogInComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // Mark all fields as touched to show validation messages
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const loginData: LogIn = this.loginForm.value;

    this.authService.signIn(loginData).subscribe({
      next: (response: JwtResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful!',
          life: 3000
        });
        this.router.navigate(['/createUser']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Login failed. Please try again.',
          life: 5000
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  loginWithGitHub() {
    // This is a direct redirect, no form validation needed
    window.location.href = 'http://localhost:8088/oauth/github/login';
  }

  // Helper methods for template
  isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return formField ? formField.invalid && formField.touched : false;
  }

  getFieldError(field: string): string {
    const formField = this.loginForm.get(field);
    if (!formField || !formField.errors) return '';

    if (formField.errors['required']) {
      return 'This field is required';
    } else if (formField.errors['email']) {
      return 'Please enter a valid email';
    }
    
    return '';
  }
}