import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointComponent } from './patient-appoint.component';

describe('PatientAppointComponent', () => {
  let component: PatientAppointComponent;
  let fixture: ComponentFixture<PatientAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
