import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarManagementComponent } from './car-management/car-management.component';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
   providers: [
    { provide: LOCALE_ID, useValue: 'hu' } // magyar nyelvi beállítás
  ]
})
export class AppComponent {
  title = 'Car Rental';
}
