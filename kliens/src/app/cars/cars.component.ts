import { Component } from '@angular/core';
import { Car } from '../shared/services/model/Car';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { CarService } from '../shared/services/car.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cars',
  imports: [CommonModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  cars?: Car[];
  constructor(private carService:CarService,
      private authService:AuthService,
    private router:Router
  ){}
    viewDetails(carId: string) {
    if(carId){
    this.router.navigate(['/cars', carId]);
    }
  }
  ngOnInit(){
      this.carService.getAll().subscribe({
        next:(data)=>{
          this.cars=data;
        },error:(err)=>{
          console.log(err);
        }
      });
    }
}
