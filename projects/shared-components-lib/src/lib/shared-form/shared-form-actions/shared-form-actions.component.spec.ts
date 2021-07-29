import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormActionsComponent } from './shared-form-actions.component';

describe('SharedFormActionsComponent', () => {
  let component: SharedFormActionsComponent;
  let fixture: ComponentFixture<SharedFormActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedFormActionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
