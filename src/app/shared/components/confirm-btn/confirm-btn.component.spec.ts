import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBtnComponent } from './confirm-btn.component';

describe('ConfirmBtnComponent', () => {
  let component: ConfirmBtnComponent;
  let fixture: ComponentFixture<ConfirmBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmBtnComponent]
    });
    fixture = TestBed.createComponent(ConfirmBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
