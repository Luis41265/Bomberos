import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarUPage } from './registrar-u.page';

describe('RegistrarUPage', () => {
  let component: RegistrarUPage;
  let fixture: ComponentFixture<RegistrarUPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
