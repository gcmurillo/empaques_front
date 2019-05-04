import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolEditComponent } from './pool-edit.component';

describe('PoolEditComponent', () => {
  let component: PoolEditComponent;
  let fixture: ComponentFixture<PoolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
