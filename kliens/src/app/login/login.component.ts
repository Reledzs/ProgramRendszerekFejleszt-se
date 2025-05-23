import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    email: string= '';
    password: string= '';
    errorMessage: string= 'd';
    constructor(private router: Router,private authService:AuthService,private snackBar: MatSnackBar){}
    login(){
        if (this.email && this.password) {
          this.errorMessage = '';
          this.authService.login(this.email, this.password).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigateByUrl('/cars');
                this.authService.initAuthStatus();
              }
            }, error: (err) => {
              this.snackBar.open(
                err.error?.message || 'Hiba történt a művelet során.','Bezár',
              {
                duration: 4000,
                panelClass: ['snackbar-error']
              });
            },
          })
        } else {
          this.errorMessage = 'Form is empty.';
        };
    }
    navigate(to:string){
      this.router.navigateByUrl(to);
    }
}
