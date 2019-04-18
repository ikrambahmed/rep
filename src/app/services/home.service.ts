import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
 
  constructor(private http: HttpClient) { }
  getDept(cin:String):Observable<any> 
  {console.log("belek 8alta lena ") ;
    return this.http.get('http://localhost:8080/miss_cni-0.0.1-SNAPSHOT/api/DeptOfUsername?username='+cin) ; 
  }
}
