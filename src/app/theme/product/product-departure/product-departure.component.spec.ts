import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDepartureComponent } from './product-departure.component';

describe('ProductDepartureComponent', () => {
  let component: ProductDepartureComponent;
  let fixture: ComponentFixture<ProductDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
