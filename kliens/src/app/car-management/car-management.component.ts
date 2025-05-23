import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CarService } from '../shared/services/car.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Car } from '../shared/services/model/Car';
import { AddCarComponent } from '../add-car/add-car.component';
import { UpdateCarComponent } from '../update-car/update-car.component';
import { 
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
 } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-management',
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './car-management.component.html',
  styleUrl: './car-management.component.scss'
})

export class CarManagementComponent {
  cars: Car[]=[];
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['imagePath','brand', 'model', 'year', 'price', 'actions'];
  constructor (private authService:AuthService,
  private router:Router,
  private carService:CarService){}
  ngOnInit(){
    this.loadData();
  }
  openAddCarDialog():void {
    const dialogRef = this.dialog.open(AddCarComponent, {
      height: '600px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.loadData();
      }
    });
  }
  openUpdateCarDialog():void {
    const dialogRef = this.dialog.open(UpdateCarComponent, {
      height: '600px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.loadData();
      }
    });
  }
  deleteCar(car:Car){
    this.carService.deleteCar(car).subscribe({
      next: (response) => this.loadData(),
      error: (err) => console.error('Hiba a mentés során:', err)
    });
  }
  editCar(car:Car){
    const dialogRef = this.dialog.open(UpdateCarComponent, {
      data:car,
      height: '600px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  loadData(){
  this.carService.getAll().subscribe({
      next:(data)=>{
        this.cars=data;
      },error:(err)=>{
        console.log(err);
      }
    });
  }
}
