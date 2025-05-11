import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService, LogIn } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
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

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LogIn = this.loginForm.value;
      this.authService.signIn(loginData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome!' });
          // Redirect user or perform additional actions
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials!' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form is invalid!' });
    }
  }
}