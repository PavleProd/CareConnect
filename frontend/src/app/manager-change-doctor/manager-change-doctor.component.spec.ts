import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChangeDoctorComponent } from './manager-change-doctor.component';

describe('ManagerChangeDoctorComponent', () => {
  let component: ManagerChangeDoctorComponent;
  let fixture: ComponentFixture<ManagerChangeDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerChangeDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerChangeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
