import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { AlertfyService } from 'src/app/shared/AlertfyService';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private alertfy:AlertfyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
     
catchError(error=>{
  if(error.status==500){
     const navigationExtras: NavigationExtras ={state:{error:error.error}};
      this.router.navigateByUrl("/server-error",navigationExtras);
  }
  if(error.status===404){
      this.alertfy.error(error.error.message);
      this.router.navigateByUrl("/not-found");
  }
  if(error.status===400){
    if(error.error.errors){
     throw error.error;
    }
    else{
      this.alertfy.error(error.error.message);
    }
   
  
}
  return throwError(error);
})
    );
  }
}
