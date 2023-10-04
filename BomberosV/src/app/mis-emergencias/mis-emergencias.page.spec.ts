import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisEmergenciasPage } from './mis-emergencias.page';

describe('MisEmergenciasPage', () => {
  let component: MisEmergenciasPage;
  let fixture: ComponentFixture<MisEmergenciasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisEmergenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
