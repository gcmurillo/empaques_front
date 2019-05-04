import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpaquesListComponent } from './empaques-list.component';

describe('EmpaquesListComponent', () => {
  let component: EmpaquesListComponent;
  let fixture: ComponentFixture<EmpaquesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpaquesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpaquesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
