import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorChangeProfileComponent } from './doctor-change-profile.component';

describe('DoctorChangeProfileComponent', () => {
  let component: DoctorChangeProfileComponent;
  let fixture: ComponentFixture<DoctorChangeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorChangeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorChangeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
