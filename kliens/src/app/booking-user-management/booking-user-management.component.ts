import { Component, ViewChild } from '@angular/core';
import { BookingService } from '../shared/services/booking.service';
import { Booking } from '../shared/services/model/Booking';
import { CommonModule } from '@angular/common';
import { BookingDetails } from '../shared/services/model/BookingDetails';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-user-management',
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSortModule,
    MatSnackBarModule],
  templateUrl: './booking-user-management.component.html',
  styleUrl: './booking-user-management.component.scss'
})
export class BookingUserManagementComponent {
  displayedColumns: string[] = ['email','brand', 'model','extra', 'bookingDate', 'startDate', 'endDate','price','bookingState','actions'];
  datasource = new MatTableDataSource<BookingDetails>([]);
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }
  constructor(private bookingservice:BookingService, private snackBar: MatSnackBar){}
  disabledButton(booking:BookingDetails): boolean {
    if(booking.status=="completed" || booking.status=="canceled"){return true;}
    const sd = new Date(booking.startDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    sd.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return sd<tomorrow;
  }
  ngOnInit(){
    this.loadBookings();
  }
  loadBookings(){
    this.bookingservice.getMyBookings().subscribe({
      next:(data)=>{
        const bookings: BookingDetails[]=data;
        this.datasource=new MatTableDataSource<BookingDetails>(bookings);
        this.ngAfterViewInit();
      },error:(err)=>{
        console.log(err);
      }
    });
  }
  bookingCancellation(booking: BookingDetails) {
  if (!booking._id) return;

  this.bookingservice.usercancelBooking(booking._id).subscribe({
    next: (res: any) => {
      this.loadBookings(); // Frissítjük az adatokat
      this.snackBar.open(res.message, 'Bezár', {
        duration: 3000,         // 3 másodpercig látszik
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success']  // opcionális CSS osztály
      });
    },
    error: (err) => {
      console.error('Lemondás sikertelen:', err);
      this.snackBar.open(err.error.message || 'Hiba történt', 'Bezár', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
}
}

