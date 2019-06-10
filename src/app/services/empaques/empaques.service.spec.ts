import { TestBed } from '@angular/core/testing';

import { EmpaquesService } from './empaques.service';

describe('EmpaquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpaquesService = TestBed.get(EmpaquesService);
    expect(service).toBeTruthy();
  });
});
