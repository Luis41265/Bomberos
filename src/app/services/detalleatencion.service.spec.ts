import {TestBed} from '@angular/core/testing';

import {DetalleatencionService} from './detalleatencion.service';

describe('DetalleatencionService', () => {
  let service: DetalleatencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleatencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
