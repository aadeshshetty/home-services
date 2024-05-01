import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionModalComponent } from './user-permission-modal.component';

describe('UserPermissionModalComponent', () => {
  let component: UserPermissionModalComponent;
  let fixture: ComponentFixture<UserPermissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPermissionModalComponent]
    });
    fixture = TestBed.createComponent(UserPermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
