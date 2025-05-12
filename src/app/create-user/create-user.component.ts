import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/core/models/user';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { RoleService } from '../services/role.service';
import { Role } from 'src/core/models/role';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ToastModule } from 'primeng/toast'; // Import ToastModule
import { CommonModule } from '@angular/common'; // 👈 Add this
import { DropdownModule } from 'primeng/dropdown'; // ✅ Add this import

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, CommonModule, DropdownModule], // Add ToastModule here
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      number: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      roles: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
        console.log('Fetched roles:', this.roles); // Should show an array of roles with `roleName`
      },
      error => console.error('Error fetching roles', error)
    );
  }
  
  createUser(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const selectedRole: Role = formValue.roles;
      console.log('Selected role:', selectedRole);
      console.log('Form value:', this.userForm.value);
      
      if (!selectedRole || !selectedRole.roleName) {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No role selected!' });
        return;
      }
  
      const user: User = {
        ...formValue,
        roles: [selectedRole] // put the single role into an array
      };
  
      this.authService.registerUser(user, selectedRole.roleName).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully!' });
          this.userForm.reset();
        },
        error => {
          console.error('Registration error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error registering user!' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form is not valid!' });
    }
  }
  }