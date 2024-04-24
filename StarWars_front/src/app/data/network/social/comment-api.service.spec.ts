import { TestBed } from '@angular/core/testing';

import { CommentAPIService } from './comment-api.service';

describe('CommentAPIService', () => {
  let service: CommentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
