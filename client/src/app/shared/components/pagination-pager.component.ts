import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 
@Component({
  selector: 'app-pagination-pager',
  templateUrl: './pagination-pager.component.html',
  styleUrls: ['./pagination-pager.component.scss']
})
export class PaginationPagerComponent implements OnInit {
  
  @Input() pageNumber?:number;
  @Input() pageSize?:number;
  @Input() totalCount?:number;
  @Output() pageChangedEvent=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  pageChanged(event:any){
    this.pageChangedEvent?.emit(event);
  }

}
