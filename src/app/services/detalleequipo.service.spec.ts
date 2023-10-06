import { TestBed } from '@angular/core/testing';

import { DetalleequipoService } from './detalleequipo.service';

describe('DetalleequipoService', () => {
  let service: DetalleequipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleequipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
