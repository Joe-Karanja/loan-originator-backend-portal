import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { MotorRoutingModule } from './motor-routing';
import { NewApplicationsComponent } from './applications/new-applications/new-applications.component';
import { ViewNewApplicationComponent } from './applications/view-new-application/view-new-application.component';
import { PendingValuationsComponent } from './valuations/pending-valuations/pending-valuations.component';
import { CompletedValuationsComponent } from './valuations/completed-valuations/completed-valuations.component';
import { PendingPaymentsComponent } from './payments/pending-payments/pending-payments.component';
import { CompletedPaymentsComponent } from './payments/completed-payments/completed-payments.component';
import { ListNewClaimsComponent } from './claims/list-new-claims/list-new-claims.component';
import { ListClaimsUnderInspectionComponent } from './claims/list-claims-under-inspection/list-claims-under-inspection.component';
import { ListSettledClaimsComponent } from './claims/list-settled-claims/list-settled-claims.component';
import { ViewCompletedValuationsComponent } from './valuations/view-completed-valuations/view-completed-valuations.component';
import { ViewSingleCoverComponent } from './payments/view-single-cover/view-single-cover.component';
import { ViewSingleNewClaimComponent } from './claims/view-single-new-claim/view-single-new-claim.component';
import { ListClaimsPendingApprovalComponent } from './claims/list-claims-pending-approval/list-claims-pending-approval.component';
import { ViewClaimUnderInspectionComponent } from './claims/view-claim-under-inspection/view-claim-under-inspection.component';
import { ViewClaimPendingApprovalComponent } from './claims/view-claim-pending-approval/view-claim-pending-approval.component';
import { ListThirdPartyApplicationsComponent } from './third-party/manage-applications/list-third-party-applications/list-third-party-applications.component';
import { ListComprehensiveApplicationsComponent } from './comprehensive/manage-applications/list-comprehensive-applications/list-comprehensive-applications.component';
import { ListComprehensiveClaimsComponent } from './comprehensive/manage-claims/list-comprehensive-claims/list-comprehensive-claims.component';
import { ListThirdPartyClaimsComponent } from './third-party/manage-applications/list-third-party-applications/manage-claims/list-third-party-claims/list-third-party-claims.component';
@NgModule({
  imports: [
    SharedModule,
    MotorRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    NewApplicationsComponent,
    ViewNewApplicationComponent,
    PendingValuationsComponent,
    CompletedValuationsComponent,
    PendingPaymentsComponent,
    CompletedPaymentsComponent,
    ListNewClaimsComponent,
    ListClaimsUnderInspectionComponent,
    ListSettledClaimsComponent,
    ViewCompletedValuationsComponent,
    ViewSingleCoverComponent,
    ViewSingleNewClaimComponent,
    ListClaimsPendingApprovalComponent,
    ViewClaimUnderInspectionComponent,
    ViewClaimPendingApprovalComponent,
    ListThirdPartyApplicationsComponent,
    ListComprehensiveApplicationsComponent,
    ListComprehensiveClaimsComponent,
    ListThirdPartyClaimsComponent
  ]
  ,
  entryComponents: [
  ],
})
export class MotorModule { }

