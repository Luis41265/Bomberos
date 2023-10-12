import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IngresarEquipoPage} from './ingresar-equipo.page';

describe('IngresarEquipoPage', () => {
  let component: IngresarEquipoPage;
  let fixture: ComponentFixture<IngresarEquipoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresarEquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
