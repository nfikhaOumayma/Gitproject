import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthCallbackComponentComponent } from './oauth-callback-component.component';

describe('OAuthCallbackComponentComponent', () => {
  let component: OAuthCallbackComponentComponent;
  let fixture: ComponentFixture<OAuthCallbackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuthCallbackComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OAuthCallbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
