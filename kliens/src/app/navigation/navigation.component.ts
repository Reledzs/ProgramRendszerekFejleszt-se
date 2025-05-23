import { Component } from '@angular/core';
import { Router, RouterOutlet,RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { map, Observable, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule,
    RouterLink,
    MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  
  constructor(private formBuilder:FormBuilder,
  private authService:AuthService,
  private router:Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isAdmin$ = this.authService.isAdmin$;
  }
  ngOnInit(){
    this.authService.initAuthStatus();
  }
  logout(){
    this.authService.logout().subscribe({
      next: v=>this.authService.initAuthStatus()
    });
    this.router.navigateByUrl('/login');
  };

}
