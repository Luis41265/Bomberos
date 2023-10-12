import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SolicitarEmergenciaPage} from './solicitar-emergencia.page';

describe('SolicitarEmergenciaPage', () => {
  let component: SolicitarEmergenciaPage;
  let fixture: ComponentFixture<SolicitarEmergenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitarEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
