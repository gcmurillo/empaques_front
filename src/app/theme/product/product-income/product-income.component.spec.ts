import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIncomeComponent } from './product-income.component';

describe('ProductIncomeComponent', () => {
  let component: ProductIncomeComponent;
  let fixture: ComponentFixture<ProductIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
