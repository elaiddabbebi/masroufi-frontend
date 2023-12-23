import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelFooterComponent } from './confirm-cancel-footer.component';

describe('ConfirmCancelFooterComponent', () => {
  let component: ConfirmCancelFooterComponent;
  let fixture: ComponentFixture<ConfirmCancelFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCancelFooterComponent]
    });
    fixture = TestBed.createComponent(ConfirmCancelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
