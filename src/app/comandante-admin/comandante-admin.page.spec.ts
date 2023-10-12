import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ComandanteAdminPage} from './comandante-admin.page';

describe('ComandanteAdminPage', () => {
  let component: ComandanteAdminPage;
  let fixture: ComponentFixture<ComandanteAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComandanteAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
