import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowingCreateComponent } from './sowing-create.component';

describe('SowingCreateComponent', () => {
  let component: SowingCreateComponent;
  let fixture: ComponentFixture<SowingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
