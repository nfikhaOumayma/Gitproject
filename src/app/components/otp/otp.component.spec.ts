import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPComponent } from './otp.component';

describe('OTPComponent', () => {
  let component: OTPComponent;
  let fixture: ComponentFixture<OTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OTPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
