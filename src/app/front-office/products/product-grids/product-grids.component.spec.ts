import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridsComponent } from './product-grids.component';

describe('ProductGridsComponent', () => {
  let component: ProductGridsComponent;
  let fixture: ComponentFixture<ProductGridsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGridsComponent]
    });
    fixture = TestBed.createComponent(ProductGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
