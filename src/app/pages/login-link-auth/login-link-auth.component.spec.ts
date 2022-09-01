import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLinkAuthComponent } from './login-link-auth.component';

describe('LoginLinkAuthComponent', () => {
  let component: LoginLinkAuthComponent;
  let fixture: ComponentFixture<LoginLinkAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLinkAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLinkAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
