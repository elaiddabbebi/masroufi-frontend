import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupperAdminDashboardComponent } from './supper-admin-dashboard.component';

describe('SupperAdminDashboardComponent', () => {
  let component: SupperAdminDashboardComponent;
  let fixture: ComponentFixture<SupperAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupperAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(SupperAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
