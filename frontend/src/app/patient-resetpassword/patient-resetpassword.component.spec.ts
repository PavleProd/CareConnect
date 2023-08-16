import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientResetpasswordComponent } from './patient-resetpassword.component';

describe('PatientResetpasswordComponent', () => {
  let component: PatientResetpasswordComponent;
  let fixture: ComponentFixture<PatientResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientResetpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
