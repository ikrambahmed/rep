import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AppService) {}
  
  public getToken():string {
    return localStorage.getItem('token');
  }

 /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ headers: request.headers.set(
        'Authorisation' , `Token ${this.getToken()}`)
      }) ; 
    return next.handle(request);
  }*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('token');
    var jsonObject : any = JSON.parse(this.getToken()) ; 
    if (!!jwt) {
     req = req.clone({
       setHeaders: {
         Authorisation: `Token ${jsonObject}` ,
       }
      

     });
   }
   return next.handle(req);

}
}