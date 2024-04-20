import { TestBed } from '@angular/core/testing';

import { AuthAPIServiceService } from './auth-apiservice.service';

describe('AuthAPIServiceService', () => {
  let service: AuthAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
