import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpaquesCreateComponent } from './empaques-create.component';

describe('EmpaquesCreateComponent', () => {
  let component: EmpaquesCreateComponent;
  let fixture: ComponentFixture<EmpaquesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpaquesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpaquesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
