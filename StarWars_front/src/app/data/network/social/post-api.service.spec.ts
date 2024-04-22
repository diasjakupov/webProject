import { TestBed } from '@angular/core/testing';

import { PostAPIService } from './post-api.service';

describe('PostAPIService', () => {
  let service: PostAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
