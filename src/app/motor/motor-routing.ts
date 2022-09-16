import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewApplicationsComponent } from './applications/new-applications/new-applications.component';
import { ViewNewApplicationComponent } from './applications/view-new-application/view-new-application.component';
import { PendingValuationsComponent } from './valuations/pending-valuations/pending-valuations.component';
import { CompletedValuationsComponent } from './valuations/completed-valuations/completed-valuations.component';
import { CompletedPaymentsComponent } from './payments/completed-payments/completed-payments.component';
import { PendingPaymentsComponent } from './payments/pending-payments/pending-payments.component';
import { ListNewClaimsComponent } from './claims/list-new-claims/list-new-claims.component';
import { ListClaimsUnderInspectionComponent } from './claims/list-claims-under-inspection/list-claims-under-inspection.component';
import { ListSettledClaimsComponent } from './claims/list-settled-claims/list-settled-claims.component';
import { ViewCompletedValuationsComponent } from './valuations/view-completed-valuations/view-completed-valuations.component';
import { ViewSingleNewClaimComponent } from './claims/view-single-new-claim/view-single-new-claim.component';
import { ViewSingleCoverComponent } from './payments/view-single-cover/view-single-cover.component';
import { ListClaimsPendingApprovalComponent } from './claims/list-claims-pending-approval/list-claims-pending-approval.component';
import { ViewClaimUnderInspectionComponent } from './claims/view-claim-under-inspection/view-claim-under-inspection.component';
import { ViewClaimPendingApprovalComponent } from './claims/view-claim-pending-approval/view-claim-pending-approval.component';
import { ListComprehensiveApplicationsComponent } from './comprehensive/manage-applications/list-comprehensive-applications/list-comprehensive-applications.component';
import { ListThirdPartyApplicationsComponent } from './third-party/manage-applications/list-third-party-applications/list-third-party-applications.component';
import { ListComprehensiveClaimsComponent } from './comprehensive/manage-claims/list-comprehensive-claims/list-comprehensive-claims.component';
import { ListThirdPartyClaimsComponent } from './third-party/manage-applications/list-third-party-applications/manage-claims/list-third-party-claims/list-third-party-claims.component';
const routes: Routes = [
    {
        path: 'third-party',
        children: [
          
            {
                path: 'new',
                 component: ListThirdPartyApplicationsComponent,
                 data: { breadcrumb: 'Motor Third Party Application' }
            },
            {
                path: ':id',
                component: ViewNewApplicationComponent,
                 data: { breadcrumb: 'View' }
            },
            {
                path: 'claims',
                children: [
          
                    {
                        path: 'all',
                        component: ListThirdPartyClaimsComponent,
                         data: { breadcrumb: 'Third Party Claims' }
                    },
                ]
            }
        ]
    },
    {
        path: 'comprehensive',
        children: [
          
            {
                path: 'new',
                component: ListComprehensiveApplicationsComponent,
                 data: { breadcrumb: 'Motor Comprehensive Applications' }
            },
            {
                path: ':id',
                component: ViewNewApplicationComponent,
                 data: { breadcrumb: 'View' }
            },
            {
                path: 'claims',
                children: [
          
                    {
                        path: 'all',
                        component: ListComprehensiveClaimsComponent,
                         data: { breadcrumb: 'Claims' }
                    },
                ]
            }
        ]
    },
    {
        path: 'applications',
        children: [
          
            {
                path: 'new',
                component: NewApplicationsComponent,
                 data: { breadcrumb: 'New Applications' }
            },
            {
                path: ':id',
                component: ViewNewApplicationComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    {
        path: 'valuations',
        children: [
          
            {
                path: 'pending',
                component: PendingValuationsComponent,
                 data: { breadcrumb: 'Pending Valuations' }
            },
            {
                path: 'completed',
                component: CompletedValuationsComponent,
                 data: { breadcrumb: 'Completed Valuations' }
            },
            {
                path: ':id',
                component: ViewCompletedValuationsComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    {
        path: 'payments',
        children: [
          
            {
                path: 'pending',
                component: PendingPaymentsComponent,
                 data: { breadcrumb: 'Pending Payments' }
            },
            {
                path: 'paid',
                component: CompletedPaymentsComponent,
                 data: { breadcrumb: 'Completed Payments' }
            },
            {
                path: ':id',
                component: ViewSingleCoverComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    {
        path: 'claims',
        children: [
          
            {
                path: 'new',
                component: ListNewClaimsComponent,
                 data: { breadcrumb: 'New Claims' }
            },
            {
                path: 'inspection',
                component: ListClaimsUnderInspectionComponent,
                 data: { breadcrumb: 'Claims Under Inspection' }
            },
            {
                path: 'pending',
                component: ListClaimsPendingApprovalComponent,
                 data: { breadcrumb: 'Claims Pending Approval' }
            },
            {
                path: 'completed',
                component: ListSettledClaimsComponent,
                 data: { breadcrumb: 'Settled Claims' }
            },
            {
                path: ':id',
                component: ViewSingleNewClaimComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    {
        path: 'inspection',
        children: [
            {
                path: ':id',
                component: ViewClaimUnderInspectionComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    {
        path: 'settlement',
        children: [
            {
                path: ':id',
                component: ViewClaimPendingApprovalComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    }
];

export const MotorRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
