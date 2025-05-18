import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OTPService } from 'src/core/services/otp.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OTPComponent implements OnInit {
  email: string = '';
  otp: string = '';

  constructor(
    private route: ActivatedRoute,
    private otpService: OTPService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';
  }

  verifyAccount(): void {
    this.otpService.verifyAccount(this.email, this.otp).subscribe({
      next: (success) => {
        if (success) {
          alert('Votre compte a été vérifié avec succès !');
          this.router.navigate(['/login']);
        } else {
          alert('Code OTP invalide ou expiré.');
        }
      },
      error: () => {
        alert('Erreur lors de la vérification du compte.');
      },
    });
  }

  resendOTP(): void {
    this.otpService.resendOTP(this.email).subscribe({
      next: (response) => {
        alert('Un nouveau code a été envoyé à votre email.');
      },
      error: () => {
        alert("Erreur lors de l'envoi du nouveau code.");
      },
    });
  }
}
