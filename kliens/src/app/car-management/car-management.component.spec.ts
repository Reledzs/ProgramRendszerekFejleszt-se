import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarManagementComponent } from './car-management.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddCarComponent } from '../add-car/add-car.component';
import { MatDialog } from '@angular/material/dialog';

describe('CarManagementComponent', () => {
  let component: CarManagementComponent;
  let fixture: ComponentFixture<CarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarManagementComponent,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        AddCarComponent,
        MatDialog
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
