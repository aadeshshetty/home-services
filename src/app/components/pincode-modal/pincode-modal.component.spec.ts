import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeModalComponent } from './pincode-modal.component';

describe('PincodeModalComponent', () => {
  let component: PincodeModalComponent;
  let fixture: ComponentFixture<PincodeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PincodeModalComponent]
    });
    fixture = TestBed.createComponent(PincodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
