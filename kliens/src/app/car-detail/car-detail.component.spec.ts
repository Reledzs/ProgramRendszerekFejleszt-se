import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsComponent } from './car-detail.component';

describe('CarDetailComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
