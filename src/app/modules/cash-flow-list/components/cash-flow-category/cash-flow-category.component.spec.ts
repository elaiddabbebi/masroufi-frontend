import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowCategoryComponent } from './cash-flow-category.component';

describe('CashFlowCategoryComponent', () => {
  let component: CashFlowCategoryComponent;
  let fixture: ComponentFixture<CashFlowCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashFlowCategoryComponent]
    });
    fixture = TestBed.createComponent(CashFlowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
