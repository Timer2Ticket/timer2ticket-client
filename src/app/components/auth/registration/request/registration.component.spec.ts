import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequestComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationRequestComponent;
  let fixture: ComponentFixture<RegistrationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
