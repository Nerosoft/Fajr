import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassComponent } from './user-pass.component';

describe('UserPassComponent', () => {
  let component: UserPassComponent;
  let fixture: ComponentFixture<UserPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
