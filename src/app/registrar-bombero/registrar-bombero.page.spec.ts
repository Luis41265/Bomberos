import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegistrarBomberoPage} from './registrar-bombero.page';

describe('RegistrarBomberoPage', () => {
  let component: RegistrarBomberoPage;
  let fixture: ComponentFixture<RegistrarBomberoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarBomberoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
