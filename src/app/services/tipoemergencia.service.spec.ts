import {TestBed} from '@angular/core/testing';

import {TipoemergenciaService} from './tipoemergencia.service';

describe('TipoemergenciaService', () => {
  let service: TipoemergenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoemergenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
