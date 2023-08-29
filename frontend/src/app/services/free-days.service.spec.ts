import { TestBed } from '@angular/core/testing';

import { FreeDaysService } from './free-days.service';

describe('FreeDaysService', () => {
  let service: FreeDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
