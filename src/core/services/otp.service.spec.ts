import { TestBed } from '@angular/core/testing';

import { OTPService } from './otp.service';

describe('OTPService', () => {
  let service: OTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
