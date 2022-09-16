import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { ValuationsRoutingModule } from './valuations-routing';
import { ListPendingValuationsComponent } from './list-pending-valuations/list-pending-valuations.component';
import { ListDoneValuationsComponent } from './list-done-valuations/list-done-valuations.component';
import { DoValuationComponent } from './do-valuation/do-valuation.component';
@NgModule({
  imports: [
    SharedModule,
    ValuationsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [

  ListPendingValuationsComponent,

  ListDoneValuationsComponent,

  DoValuationComponent],
  entryComponents: [
  ],
})
export class ValuationsModule { }

