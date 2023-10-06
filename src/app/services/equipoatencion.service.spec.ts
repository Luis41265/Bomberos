import { TestBed } from '@angular/core/testing';

import { EquipoatencionService } from './equipoatencion.service';

describe('EquipoatencionService', () => {
  let service: EquipoatencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipoatencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
