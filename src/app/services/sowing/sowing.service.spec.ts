import { TestBed, inject } from '@angular/core/testing';

import { SowingService } from './sowing.service';

describe('SowingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SowingService]
    });
  });

  it('should be created', inject([SowingService], (service: SowingService) => {
    expect(service).toBeTruthy();
  }));
});
