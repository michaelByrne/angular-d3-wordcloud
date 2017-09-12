import { TestBed, inject } from '@angular/core/testing';

import { D3CloudService } from './d3-cloud.service';

describe('D3CloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3CloudService]
    });
  });

  it('should be created', inject([D3CloudService], (service: D3CloudService) => {
    expect(service).toBeTruthy();
  }));
});
