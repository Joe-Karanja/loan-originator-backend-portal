import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { TravelRoutingModule } from './travel-routing';
@NgModule({
  imports: [
    SharedModule,
    TravelRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    
  ]
  ,
  entryComponents: [
  ],
})
export class TravelModule { }

