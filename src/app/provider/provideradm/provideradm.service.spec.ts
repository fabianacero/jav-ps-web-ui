import { TestBed } from '@angular/core/testing';

import { ProvideradmService } from './provideradm.service';

describe('ProvideradmService', () => {
  let service: ProvideradmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideradmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
