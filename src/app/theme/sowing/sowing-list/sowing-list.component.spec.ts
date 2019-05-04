import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowingListComponent } from './sowing-list.component';

describe('SowingListComponent', () => {
  let component: SowingListComponent;
  let fixture: ComponentFixture<SowingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
