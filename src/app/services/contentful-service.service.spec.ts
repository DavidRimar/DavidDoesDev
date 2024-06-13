import { TestBed } from '@angular/core/testing';

import { ContentfulServiceService } from './contentful-service.service';

describe('ContentfulServiceService', () => {
  let service: ContentfulServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentfulServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
