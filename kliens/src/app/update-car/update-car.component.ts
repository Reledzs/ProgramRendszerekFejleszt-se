import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Car } from "../shared/services/model/Car";
import { CarService } from '../shared/services/car.service';
@Component({
  selector: 'update-car-dialog',
  standalone: true,
  templateUrl: './update-car.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class UpdateCarComponent {
  selectedFileName: string | null = null;
  title="";
  selectedFile: File | null = null;
  carService = inject(CarService); 
  car:Car = inject<Car>(MAT_DIALOG_DATA)?? {
    brand: '',
    car_model: '',
    year: new Date().getFullYear(),
    price: 0,
    _id: '',
  };
  ngOnInit(){
      this.title="Autó szerkeztése"
  }
  readonly dialogRef = inject(MatDialogRef<UpdateCarComponent>);
  onSave() {
    this.carService.updateCar(this.car, this.selectedFile  ?? null).subscribe({
    next: () => this.dialogRef.close(),
    error: (err: any) => console.error('Hiba mentés közben:', err)
    });
  }
  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.selectedFileName = input.files[0].name;
  }
}

  onCancel() {
    this.dialogRef.close();
  }
}

