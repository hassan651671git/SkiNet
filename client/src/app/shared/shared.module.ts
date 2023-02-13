import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationHeaderComponent } from './components/pagination-header.component';
import { PaginationPagerComponent } from './components/pagination-pager.component';
import { FormsModule } from '@angular/forms';
import { AlertfyService } from './AlertfyService';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationPagerComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule
    
  ],
  providers:[AlertfyService,CarouselModule],
  exports:[
    PaginationModule,
    PaginationHeaderComponent,
    PaginationPagerComponent,
    FormsModule,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
