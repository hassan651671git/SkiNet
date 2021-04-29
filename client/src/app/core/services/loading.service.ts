import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingService {
busyRequestCount=0;
constructor(private spinnerService:NgxSpinnerService) { }
busy(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined,{
type:'timer',
bdColor:'rgba(255,255,255,0.5)',
color:'#333'
    });
}
idel(){
    this.busyRequestCount--;
    if(this.busyRequestCount<=0){
        this.busyRequestCount=0;
        this.spinnerService.hide();
    }
}

}
