import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExtraComponent } from './add-extra.component';
import { MatDialog } from '@angular/material/dialog';
describe('AddCarComponent', () => {
  let component: AddExtraComponent;
  let fixture: ComponentFixture<AddExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExtraComponent,
        MatDialog
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
