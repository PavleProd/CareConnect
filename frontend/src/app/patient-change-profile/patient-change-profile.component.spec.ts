import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChangeProfileComponent } from './patient-change-profile.component';

describe('PatientChangeProfileComponent', () => {
  let component: PatientChangeProfileComponent;
  let fixture: ComponentFixture<PatientChangeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientChangeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChangeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
