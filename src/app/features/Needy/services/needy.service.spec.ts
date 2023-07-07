import { TestBed } from '@angular/core/testing';

import { NeedyService } from './needy.service';

describe('NeedyService', () => {
  let service: NeedyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeedyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
