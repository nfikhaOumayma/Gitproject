import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/core/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { RoleUser } from 'src/core/models/role';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService]
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // blocked: [false],
      // valid: [true],
      // role: [null, Validators.required] 
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const newUser: User = this.signUpForm.value;
      this.authService.SignUpAdmin(newUser).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User signed up successfully!' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed!' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form is invalid!' });
    }
  }
}