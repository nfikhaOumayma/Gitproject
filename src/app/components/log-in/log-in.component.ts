import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService, LogIn } from '../../../core/services/auth.service';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
imports: [
  FormsModule,
  ProgressSpinnerModule,
  CommonModule,
  ReactiveFormsModule,
  ToastModule
],
  standalone: true
})
export class LogInComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
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
        next: (response) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome!' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials!' });
        }
      });
    } else {
      localStorage.removeItem('Token');
      this.loading = false;
      this.loginForm.reset();
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form is invalid!' });
    }
  }
}