import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { ClaimsRoutingModule } from './claims-routing';
import { ListClaimsComponent } from './list-claims/list-claims.component';
import { ApprovedClaimsComponent } from './approved-claims/approved-claims.component';
import { ViewSingleClaimComponent } from './view-single-claim/view-single-claim.component';
@NgModule({
  imports: [
    SharedModule,
    ClaimsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
  ListClaimsComponent,
  ApprovedClaimsComponent,
  ViewSingleClaimComponent]
  ,
  entryComponents: [
  ],
})
export class ClaimsModule { }

