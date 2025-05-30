import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

//FormsModul, ReactiveFormsModule

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router){}

  ngOnInit(){
    this.signupForm=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      name: [''],
      address: [''],
      nickname: [''],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.mustMatch('password','confirmPassword')
    });
  }
  mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      
      if(matchingControl.errors&&matchingControl.errors['mustMatch']){
        return;
      }
      if(control.value !==matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }else{
        matchingControl.setErrors(null);
      }
    }
  }
  onSubmit(){
    if(this.signupForm.valid){
      this.authService.register(this.signupForm.value).subscribe({
        next: (data) =>{
          this.router.navigateByUrl('/login');
        }, error: (err) =>{
          }
        });
    }
    else{
      console.log("Form not valid!");
    }
  }
  back(){
    this.router.navigateByUrl('/login');
  };
}
