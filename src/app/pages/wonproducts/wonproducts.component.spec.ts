import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonproductsComponent } from './wonproducts.component';

describe('WonproductsComponent', () => {
  let component: WonproductsComponent;
  let fixture: ComponentFixture<WonproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
