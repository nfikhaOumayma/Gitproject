import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OTPService {
  private apiUrl = 'http://localhost:8088/OTP';

  constructor(private http: HttpClient) {}

  verifyAccount(email: string, otp: string): Observable<boolean> {
    const url = `${this.apiUrl}/verify-and-activate/${email}/${otp}`;
    return this.http.post<boolean>(url, {});
  }

  resendOTP(email: string): Observable<any> {
  const url = `${this.apiUrl}/ResendOTP/${email}`;
  return this.http.post(url, {});
}

}
