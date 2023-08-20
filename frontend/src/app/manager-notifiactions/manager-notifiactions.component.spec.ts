import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNotifiactionsComponent } from './manager-notifiactions.component';

describe('ManagerNotifiactionsComponent', () => {
  let component: ManagerNotifiactionsComponent;
  let fixture: ComponentFixture<ManagerNotifiactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerNotifiactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNotifiactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
