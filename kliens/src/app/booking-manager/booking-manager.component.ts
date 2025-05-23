import { Component, LOCALE_ID } from '@angular/core';
import { BookingService } from '../shared/services/booking.service';
import { Booking } from '../shared/services/model/Booking';
import { BookingDetails } from '../shared/services/model/BookingDetails';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-manager',
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule],
  templateUrl: './booking-manager.component.html',
  styleUrl: './booking-manager.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'hu' } // Magyar lokalizáció beállítása
  ],
})
export class BookingManagerComponent {
  bookings:BookingDetails[]=[];
  displayedColumns: string[] = ['email','brand', 'model','extra', 'bookingDate', 'startDate', 'endDate','price','bookingState','actions'];
  constructor(private bookingservice:BookingService){}
  ngOnInit(){
    this.loadData();
}
  cancelBooking(id:string){
    this.bookingservice.admincanceledbooking(id).subscribe(data=>{
      this.loadData();
    })
  }
  completeBooking(id:string){
    this.bookingservice.admincompletedbooking(id).subscribe(data=>{
     this.loadData();
    });
  }
  loadData(){
    this.bookingservice.getAll().subscribe({
      next:(data)=>{
        this.bookings=data;
      },error:(err)=>{
        console.log(err);
      }
    });
  }
}