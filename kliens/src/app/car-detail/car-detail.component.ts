import { ActivatedRoute } from '@angular/router';
import { CarService } from '../shared/services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/services/model/Car';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../shared/services/booking.service';
import { Booking } from '../shared/services/model/Booking';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Extra } from '../shared/services/model/Extra';
import { ExtraService } from '../shared/services/extra.service';
@Component({
  selector: 'app-car-detail',
  imports: [CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})

export class CarDetailsComponent implements OnInit {
  extras:Extra[]=[];
  startDate=new Date();
  endDate=new Date();
  totalPrice=0;
  disabled=true;
  bookedDateRanges: { start: Date; end: Date }[] = [];
  selectedExtras: string[] = [];

toggleExtra(extraId: string, checked: boolean) {
  if (checked) {
    this.selectedExtras.push(extraId);
  } else {
    this.selectedExtras = this.selectedExtras.filter(id => id !== extraId);
  }
  this.calculateTotalPrice();
}

OnBookingConfirmClick() {
  this.disabled=true;
  if (!this.range.value.start || !this.range.value.end) {
    this.snackBar.open('Kérlek válassz kezdő és végdátumot!', 'OK', { duration: 3000 });
    return;
  }

  const booking: Booking = {
    car: this.carId,
    startDate: this.range.value.start,
    endDate: this.range.value.end,
    extras: this.selectedExtras
  };

  this.bookingService.addBooking(booking).subscribe({
    next: () => {
      this.snackBar.open('Foglalás sikeres!', 'Ok', { duration: 3000 });
      this.getCarBookings();
      //window.location.reload();
    },
    error: err => {
      this.snackBar.open('Hiba történt foglaláskor!', 'Ok', { duration: 3000 });
      console.error(err);
    }
  });
}
myFilter = (d: Date | null): boolean => {
  if (!d) return true;

  const targetDate = new Date(d);
  targetDate.setHours(0, 0, 0, 0);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (targetDate < now) return false;

  for (const range of this.bookedDateRanges) {
    const start = new Date(range.start);
    const end = new Date(range.end);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (targetDate >= start && targetDate <= end) {
      return false;
    }
  }

  return true;
};

  selectedRange = {
    begin: null as Date | null,
    end: null as Date | null,
  };
  carId!: string;
  car!: Car;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private route: ActivatedRoute, private carService: CarService, private bookingService:BookingService,private snackBar: MatSnackBar,private extraservice:ExtraService) {}
  isRangeBooked(start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  
  let currentDate = new Date(start);
  while (currentDate <= end) {
    if (!this.myFilter(currentDate)) {
      return true;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return false;
}
calculateTotalPrice(): void {
  const start = this.range.value.start;
  const end = this.range.value.end;

  if (start && end && this.car?.price) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    let extrasPrice = 0;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
    if (days > 0) {
      const basePrice = days * this.car.price;
      if (this.selectedExtras && this.selectedExtras.length > 0) {
        const selected = this.extras.filter(e => this.selectedExtras.includes(e._id));
        for (const extra of selected) {
          extrasPrice += Number(extra.price)||0;
        }
      }
      this.totalPrice = Number(extrasPrice)+ basePrice;
    } else {
      this.totalPrice = 0;
    }
  } else {
    this.totalPrice = 0;
  }
}
onDateChange(event: any) {
    this.calculateTotalPrice();
    const start = this.selectedRange.begin;
    const end = this.selectedRange.end;
    if(start===null||end===null){this.disabled=true}
    // Ellenőrzi, hogy az intervallum foglalt-e
    if (start&&end&&this.isRangeBooked(start, end)) {
      alert('Az intervallumban van foglalt nap, kérem válasszon más dátumot!');
      this.selectedRange.begin=null;
      this.selectedRange.end=null;
      this.disabled=true;
    }
    else{
      this.disabled=false;
    }
  }
  ngOnInit() {
    this.range.valueChanges.subscribe(values => {
    const { start, end } = values;

    if (!start || !end) {
      this.disabled = true;
      return;
    }
    if (this.isRangeBooked(start, end)) {
      alert('Az intervallumban van foglalt nap, kérem válasszon más dátumot!');
      this.range.setValue({ start: null, end: null });
      this.disabled = true;
    } else {
      this.disabled = false;
      this.calculateTotalPrice();
    }
  });

    this.disabled=true;
    this.carId = this.route.snapshot.paramMap.get('id')!;
    this.carService.getcar(this.carId).subscribe((car: Car) => {
    this.car = car;
    this.getCarBookings();
    this.getExtras();
  });
    
  }
  getCarBookings(){
    this.bookingService.getCarBookings(this.carId).subscribe(res => {
      this.bookedDateRanges = res.map(b => ({
      start: new Date(b.start),
      end: new Date(b.end)
    }));
    });
  }
  getExtras(){
    this.extraservice.getAll().subscribe(res => {
      this.extras=res;
    });
  }
}