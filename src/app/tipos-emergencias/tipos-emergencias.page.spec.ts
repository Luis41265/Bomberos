import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiposEmergenciasPage } from './tipos-emergencias.page';

describe('TiposEmergenciasPage', () => {
  let component: TiposEmergenciasPage;
  let fixture: ComponentFixture<TiposEmergenciasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TiposEmergenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
