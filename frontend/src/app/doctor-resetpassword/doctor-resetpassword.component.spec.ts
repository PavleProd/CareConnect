import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorResetpasswordComponent } from './doctor-resetpassword.component';

describe('DoctorResetpasswordComponent', () => {
  let component: DoctorResetpasswordComponent;
  let fixture: ComponentFixture<DoctorResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorResetpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
