import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowListComponent } from './cash-flow-list.component';

describe('ListComponent', () => {
  let component: CashFlowListComponent;
  let fixture: ComponentFixture<CashFlowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashFlowListComponent]
    });
    fixture = TestBed.createComponent(CashFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
