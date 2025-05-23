import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './model/Booking';
import { BookingDetails } from './model/BookingDetails';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  getAll(){
          return this.http.get<BookingDetails[]>('http://localhost:5000/app/bookings/all_bookings_with_details', {withCredentials:true})
  }
  getMyBookings(){
          return this.http.get<BookingDetails[]>('http://localhost:5000/app/bookings/mybookings', {withCredentials:true})
  }
  getCarBookings(id:string){
    return this.http.get<{ start: string; end: string }[]>('http://localhost:5000/app/bookings/car_bookings/'+id, {withCredentials:true})
  }
  addBooking(booking: Booking) {;
    const body=
    {
      "car": booking.car,
      "startDate": booking.startDate,
      "endDate": booking.endDate,
      "extras": booking.extras
    }
    return this.http.post('http://localhost:5000/app/bookings/add_booking', body,{withCredentials:true});
  }
  admincanceledbooking(id:string){
    return this.http.put('http://localhost:5000/app/bookings/admin_canceled_booking/'+id,{withCredentials:true})
  }
  admincompletedbooking(id:string){
    return this.http.put('http://localhost:5000/app/bookings/admin_completed_booking/'+id,{withCredentials:true})
  }
  usercancelBooking(id:string){
    return this.http.put('http://localhost:5000/app/bookings/user_cancel_booking/'+id,{withCredentials:true})
  }
      updateBooking(booking: Booking) {
        const formData = new FormData();
        if (booking._id) {
           formData.append('_id', booking._id);
        }
        formData.append('car', booking.car);
        if(booking.user)formData.append('user', booking.user);
        formData.append('startDate', booking.startDate.toString());
        formData.append('endDate', booking.endDate.toString());
         if (booking.extras && Array.isArray(booking.extras)) {
          formData.append('extras', JSON.stringify(booking.extras));
        }
        if(booking.extras) formData.append('extras', booking.extras.toString());
        return this.http.post('http://localhost:5000/app/bookings/update_car',formData)
      }
  setBookingState(booking: Booking){
        return;
  }
  getbookedDates(_id:string){
    return this.http.get<Date[]>('http://localhost:5000/app/bookings/booked_dates_for_car/'+_id,{withCredentials:true});
  }

}
