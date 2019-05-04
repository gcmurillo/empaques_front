import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtransferListComponent } from './ptransfer-list.component';

describe('PtransferListComponent', () => {
  let component: PtransferListComponent;
  let fixture: ComponentFixture<PtransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
