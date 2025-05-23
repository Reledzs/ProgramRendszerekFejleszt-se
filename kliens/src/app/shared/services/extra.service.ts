import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extra } from './model/Extra';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get<Extra[]>('http://localhost:5000/app/extras/list_extras', {withCredentials:true})
  }
  addExtra(extra: Extra) {
      const body=
      {
        "name": extra.name,
        "price": extra.price,
        "details": extra.details
      }
      return this.http.post('http://localhost:5000/app/extras/add_extra', body,{withCredentials:true});
  }
  updateExtra(extra: Extra) {
       const body=
      {
      "_id": extra._id,
      "name": extra.name,
      "price": extra.price.toString(),
      "details": extra.details
      }
      return this.http.post('http://localhost:5000/app/extras/update_extra/', body,{withCredentials:true});
  }
  deleteExtra(id: string) {
      return this.http.delete('http://localhost:5000/app/extras/delete_extra/'+id,{withCredentials:true});
  }
}
