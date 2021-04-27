import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  error404:any={};
  
  error500:any={};
  
  error400:any={};
  
  error400Validation:any={};
validationError:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
 
  }
get404Error(){
  this.http.get(environment.apiUrl+"products/55").subscribe(
data=>{ },
error=>{this.error404=error.error;}
  );
}
get500Error(){
  this.http.get(environment.apiUrl+"buggy/servererror").subscribe(
data=>{ },
error=>{this.error500=error.error;}
  );
}
get400rror(){
  this.http.get(environment.apiUrl+"buggy/badrequest").subscribe(
data=>{ },
error=>{this.error400=error.error;}
  );
}
get400ValidationError(){
  this.http.get(environment.apiUrl+"products/fourteen").subscribe(
data=>{},
error=>{this.validationError=error.errors;}
  );
}

}
