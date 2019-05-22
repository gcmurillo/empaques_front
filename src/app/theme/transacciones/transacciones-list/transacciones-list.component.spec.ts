import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesListComponent } from './transacciones-list.component';

describe('TransaccionesListComponent', () => {
  let component: TransaccionesListComponent;
  let fixture: ComponentFixture<TransaccionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
