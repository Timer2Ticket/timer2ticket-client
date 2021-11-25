import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequestDoneComponent } from './done.component';

describe('DoneComponent', () => {
  let component: RegistrationRequestDoneComponent;
  let fixture: ComponentFixture<RegistrationRequestDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationRequestDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRequestDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
