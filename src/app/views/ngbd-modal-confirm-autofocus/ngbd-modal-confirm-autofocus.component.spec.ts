import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalConfirmAutofocusComponent } from './ngbd-modal-confirm-autofocus.component';

describe('NgbdModalConfirmAutofocusComponent', () => {
  let component: NgbdModalConfirmAutofocusComponent;
  let fixture: ComponentFixture<NgbdModalConfirmAutofocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalConfirmAutofocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalConfirmAutofocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
