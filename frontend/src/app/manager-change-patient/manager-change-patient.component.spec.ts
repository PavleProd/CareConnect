import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChangePatientComponent } from './manager-change-patient.component';

describe('ManagerChangePatientComponent', () => {
  let component: ManagerChangePatientComponent;
  let fixture: ComponentFixture<ManagerChangePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerChangePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerChangePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
