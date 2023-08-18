import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPatientsComponent } from './manager-patients.component';

describe('ManagerPatientsComponent', () => {
  let component: ManagerPatientsComponent;
  let fixture: ComponentFixture<ManagerPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
