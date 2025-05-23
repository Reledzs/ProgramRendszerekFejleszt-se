import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingUserManagementComponent } from './booking-user-management.component';

describe('BookingUserManagementComponent', () => {
  let component: BookingUserManagementComponent;
  let fixture: ComponentFixture<BookingUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingUserManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
