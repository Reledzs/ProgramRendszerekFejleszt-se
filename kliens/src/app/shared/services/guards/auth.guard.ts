import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const r=inject(Router);
  return inject(AuthService).checkAuth().pipe(map(isAuthentecated =>{
    if(!isAuthentecated){
     r.navigateByUrl('/login');
      return false;
    }
    else{
      return true;
    }
  }),catchError(error=>{
    r.navigateByUrl('/login');
    return of(false);
  }));
};
