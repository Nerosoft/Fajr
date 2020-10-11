import { TestBed, async, inject } from '@angular/core/testing';

import { SuccessGuard } from './success.guard';

describe('SuccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuccessGuard]
    });
  });

  it('should ...', inject([SuccessGuard], (guard: SuccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
