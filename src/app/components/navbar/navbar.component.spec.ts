import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navbarComponent } from './navbar.component';

describe('navbarComponent', () => {
  let component: navbarComponent;
  let fixture: ComponentFixture<navbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [navbarComponent]
    });
    fixture = TestBed.createComponent(navbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
