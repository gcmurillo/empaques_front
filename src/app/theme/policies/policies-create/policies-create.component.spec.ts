import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesCreateComponent } from './policies-create.component';

describe('PoliciesCreateComponent', () => {
  let component: PoliciesCreateComponent;
  let fixture: ComponentFixture<PoliciesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
