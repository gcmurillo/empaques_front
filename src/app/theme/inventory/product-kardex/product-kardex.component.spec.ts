import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKardexComponent } from './product-kardex.component';

describe('ProductKardexComponent', () => {
  let component: ProductKardexComponent;
  let fixture: ComponentFixture<ProductKardexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKardexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
