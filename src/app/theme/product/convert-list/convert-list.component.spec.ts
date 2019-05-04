import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertListComponent } from './convert-list.component';

describe('ConvertListComponent', () => {
  let component: ConvertListComponent;
  let fixture: ComponentFixture<ConvertListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
