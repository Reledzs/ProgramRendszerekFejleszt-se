import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarComponent } from './add-car.component';
import { MatDialog } from '@angular/material/dialog';
describe('AddCarComponent', () => {
  let component: AddCarComponent;
  let fixture: ComponentFixture<AddCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarComponent,
        MatDialog
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
