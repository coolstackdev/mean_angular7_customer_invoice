import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAddComponent } from './invoice-add.component';

describe('InvoiceAddComponent', () => {
  let component: InvoiceAddComponent;
  let fixture: ComponentFixture<InvoiceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
