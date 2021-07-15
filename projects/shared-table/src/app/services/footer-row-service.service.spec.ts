import { TestBed } from '@angular/core/testing';

import { FooterRowServiceService } from './footer-row-service.service';

describe('FooterRowServiceService', () => {
  let service: FooterRowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterRowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
