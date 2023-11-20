import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWrapperComponent } from './checkout-wrapper.component';

describe('CheckoutWrapperComponent', () => {
  let component: CheckoutWrapperComponent;
  let fixture: ComponentFixture<CheckoutWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutWrapperComponent]
    });
    fixture = TestBed.createComponent(CheckoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
