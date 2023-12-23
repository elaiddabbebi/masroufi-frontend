import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCancelFooterComponent } from './save-cancel-footer.component';

describe('SaveCancelFooterComponent', () => {
  let component: SaveCancelFooterComponent;
  let fixture: ComponentFixture<SaveCancelFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveCancelFooterComponent]
    });
    fixture = TestBed.createComponent(SaveCancelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
