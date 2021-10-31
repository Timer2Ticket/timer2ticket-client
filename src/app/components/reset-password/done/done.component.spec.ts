import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordDoneComponent } from './done.component';

describe('DoneComponent', () => {
  let component: ResetPasswordDoneComponent;
  let fixture: ComponentFixture<ResetPasswordDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
