import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/User';
import { NavigationComponent } from '../../navigation/navigation.component';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this.loggedIn.asObservable();
  public isAdmin$ = this.admin.asObservable();

  hasToken(): boolean {
    throw new Error('Method not implemented.');
  }
  isAuthenticated: any;

  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    const body ={username:email,password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const res=this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true, responseType: 'text' as const});
    return res;
  }
  register(user: User){
    const body= {
      email:user.email,
      name:user.name,
      address:user.address,
      nickname:user.nickname,
      password:user.password
    };
    const headers= new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:5000/app/register',body,{headers:headers});
  }
  logout(){
    return this.http.post('http://localhost:5000/app/logout',{},{withCredentials: true, responseType:'text'});
  }
  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', { withCredentials: true })
      .pipe(
        tap(isAuth => this.loggedIn.next(isAuth))
      );
  }

  checkAdmin() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAdmin', { withCredentials: true })
      .pipe(
        tap(isAdmin => this.admin.next(isAdmin))
      );
  }
  initAuthStatus() {
    this.checkAuth().subscribe(res=>{this.admin.next(false)
      if(res){
        this.checkAdmin().subscribe(res=>{
          this.admin.next(res);
        });
      }
    });
  }
  
}
