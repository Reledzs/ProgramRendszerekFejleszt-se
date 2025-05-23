import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials:true})
  }
  deleteuser(user:User){
      return this.http.delete('http://localhost:5000/app/delete_user/'+ user._id,{withCredentials:true})
  }
  updateUser(user: User) {
      const body=
      {
      "_id": user._id,
      "email": user.email,
      "name": user.name,
      "address": user.address,
      "nickname": user.nickname,
      "role": user.role
      }
      return this.http.post('http://localhost:5000/app/update_user', body,{withCredentials:true});
  }
}
