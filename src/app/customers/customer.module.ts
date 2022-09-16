import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ViewPoliciesComponent } from './view-policies/view-policies.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { ViewCustomerInvestmentsComponent } from './view-customer-investments/view-customer-investments.component';
@NgModule({
  imports: [
    SharedModule,
    CustomerRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
  ListCustomersComponent,
  ViewPoliciesComponent,
  ViewClaimsComponent,
  ViewCustomerInvestmentsComponent]
  ,
  entryComponents: [
    ViewClaimsComponent,
    ViewPoliciesComponent,
    ViewClaimsComponent,
    ViewCustomerInvestmentsComponent
  ],
})
export class CustomerModule { }

