import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMiscComponent } from './doctor-misc.component';

describe('DoctorMiscComponent', () => {
  let component: DoctorMiscComponent;
  let fixture: ComponentFixture<DoctorMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMiscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
