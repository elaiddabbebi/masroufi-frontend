import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowRegistryComponent } from './cash-flow-registry.component';

describe('CashFlowRegistryComponent', () => {
  let component: CashFlowRegistryComponent;
  let fixture: ComponentFixture<CashFlowRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashFlowRegistryComponent]
    });
    fixture = TestBed.createComponent(CashFlowRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
