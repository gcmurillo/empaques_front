import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesEditComponent } from './policies-edit.component';

describe('PoliciesEditComponent', () => {
  let component: PoliciesEditComponent;
  let fixture: ComponentFixture<PoliciesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
