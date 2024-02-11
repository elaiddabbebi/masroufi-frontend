import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionConfigComponent } from './subscription-config.component';

describe('SubscriptionConfigComponent', () => {
  let component: SubscriptionConfigComponent;
  let fixture: ComponentFixture<SubscriptionConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionConfigComponent]
    });
    fixture = TestBed.createComponent(SubscriptionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
