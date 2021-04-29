import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { LoadingService } from './services/loading.service';
 
@NgModule({
  declarations: [NavBarComponent,
                 TestErrorComponent, 
                 ServerErrorComponent,
                  NotFoundComponent, 
                  SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  providers: [LoadingService],
  exports:[NavBarComponent,SectionHeaderComponent,]
})
export class CoreModule { }
