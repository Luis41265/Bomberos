import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubestacionPage } from './subestacion.page';

describe('SubestacionPage', () => {
  let component: SubestacionPage;
  let fixture: ComponentFixture<SubestacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubestacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
