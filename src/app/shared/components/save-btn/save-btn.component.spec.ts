import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBtnComponent } from './save-btn.component';

describe('SaveBtnComponent', () => {
  let component: SaveBtnComponent;
  let fixture: ComponentFixture<SaveBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveBtnComponent]
    });
    fixture = TestBed.createComponent(SaveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
