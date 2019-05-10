import { TestBed } from '@angular/core/testing';

import { CustodiosService } from './custodios.service';

describe('CustodiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustodiosService = TestBed.get(CustodiosService);
    expect(service).toBeTruthy();
  });
});
