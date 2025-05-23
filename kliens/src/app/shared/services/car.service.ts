import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './model/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http:HttpClient) { }
  getAll(){
      return this.http.get<Car[]>('http://localhost:5000/app/cars/list_cars', {withCredentials:true})
    }
  addCar(car: Car, imageFile: File) {
    const formData = new FormData();
    formData.append('brand', car.brand);
    formData.append('car_model', car.car_model);
    formData.append('year', car.year.toString());
    formData.append('price', car.price.toString());

  if (imageFile) {
    formData.append('image', imageFile);
  }
  for (let [key, value] of formData.entries()) {
  }
  return this.http.post('http://localhost:5000/app/cars/add_car', formData);
 }
  deleteCar(car:Car){
    return this.http.delete('http://localhost:5000/app/cars/delete_car/'+car._id,{withCredentials:true})
  }
  updateCar(car: Car, imageFile: File |null) {
    const formData = new FormData();
    if (car._id) {
       formData.append('_id', car._id);
    }
    formData.append('brand', car.brand);
    formData.append('car_model', car.car_model);
    formData.append('year', car.year.toString());
    formData.append('price', car.price.toString());

  if (imageFile) {
    formData.append('image', imageFile);
  }
    return this.http.post('http://localhost:5000/app/cars/update_car',formData)
  }
  getcar(_id:string){
    return this.http.get<Car>('http://localhost:5000/app/cars/'+_id,{withCredentials:true})
  }
}
