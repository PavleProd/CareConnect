import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDoctorsComponent } from './manager-doctors.component';

describe('ManagerDoctorsComponent', () => {
  let component: ManagerDoctorsComponent;
  let fixture: ComponentFixture<ManagerDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
