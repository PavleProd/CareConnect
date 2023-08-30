import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChangeExaminationComponent } from './manager-change-examination.component';

describe('ManagerChangeExaminationComponent', () => {
  let component: ManagerChangeExaminationComponent;
  let fixture: ComponentFixture<ManagerChangeExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerChangeExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerChangeExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
