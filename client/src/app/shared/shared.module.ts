import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationHeaderComponent } from './components/pagination-header.component';
import { PaginationPagerComponent } from './components/pagination-pager.component';
import { FormsModule } from '@angular/forms';
import { AlertfyService } from './AlertfyService';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationPagerComponent
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
    CarouselModule
  ]
})
export class SharedModule { }
