import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreateExaminationComponent } from './manager-create-examination.component';

describe('ManagerCreateExaminationComponent', () => {
  let component: ManagerCreateExaminationComponent;
  let fixture: ComponentFixture<ManagerCreateExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCreateExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCreateExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
