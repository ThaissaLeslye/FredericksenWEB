import { TestBed } from '@angular/core/testing';

import { GoogleAuthScriptService } from './google-auth-script';

describe('GoogleAuthScriptService', () => {
  let service: GoogleAuthScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAuthScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
