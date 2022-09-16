import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { InvestmentRoutingModule } from './investment-routing';
import { ListUnitTrustApplicationsComponent } from './manage-unit-trusts/list-unit-trust-applications/list-unit-trust-applications.component';
import { ListPrivateWealthApplicationsComponent } from './manage-private-wealth/list-private-wealth-applications/list-private-wealth-applications.component';
import { ListInstitutionalInvestmentsComponent } from './manage-institutional-investments/list-institutional-investments/list-institutional-investments.component';

@NgModule({
  imports: [
    SharedModule,
    InvestmentRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ListUnitTrustApplicationsComponent,
    ListPrivateWealthApplicationsComponent,
    ListInstitutionalInvestmentsComponent
  ]
  ,
  entryComponents: [
  ],
})
export class InvestmentModule { }

