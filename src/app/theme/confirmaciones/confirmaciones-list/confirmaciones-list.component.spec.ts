import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionesListComponent } from './confirmaciones-list.component';

describe('ConfirmacionesListComponent', () => {
  let component: ConfirmacionesListComponent;
  let fixture: ComponentFixture<ConfirmacionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
