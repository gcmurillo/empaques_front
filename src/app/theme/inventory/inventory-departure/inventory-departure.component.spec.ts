import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDepartureComponent } from './inventory-departure.component';

describe('InventoryDepartureComponent', () => {
  let component: InventoryDepartureComponent;
  let fixture: ComponentFixture<InventoryDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
