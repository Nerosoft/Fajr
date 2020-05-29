import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdTableCompleteComponent } from './ngbd-table-complete.component';

describe('NgbdTableCompleteComponent', () => {
  let component: NgbdTableCompleteComponent;
  let fixture: ComponentFixture<NgbdTableCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdTableCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdTableCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
