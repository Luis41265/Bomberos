import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MiInformacionPage} from './mi-informacion.page';

describe('MiInformacionPage', () => {
  let component: MiInformacionPage;
  let fixture: ComponentFixture<MiInformacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiInformacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
