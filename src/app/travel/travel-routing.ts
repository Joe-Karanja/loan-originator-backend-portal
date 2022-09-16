import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
        path: 'applications',
        children: [
          
            {
                path: 'new',
              //  component: NewApplicationsComponent,
                 data: { breadcrumb: 'New Applications' }
            },
            {
                path: ':id',
               // component: ViewNewApplicationComponent,
                 data: { breadcrumb: 'View' }
            },
        ]
    },
    // {
    //     path: 'payments',
    //     children: [
          
    //         {
    //             path: 'pending',
    //             component: PendingPaymentsComponent,
    //              data: { breadcrumb: 'Pending Payments' }
    //         },
    //         {
    //             path: 'paid',
    //             component: CompletedPaymentsComponent,
    //              data: { breadcrumb: 'Completed Payments' }
    //         },
    //         {
    //             path: ':id',
    //             component: ViewNewApplicationComponent,
    //              data: { breadcrumb: 'View' }
    //         },
    //     ]
    // },
    // {
    //     path: 'claims',
    //     children: [
          
    //         {
    //             path: 'new',
    //             component: ListNewClaimsComponent,
    //              data: { breadcrumb: 'New Claims' }
    //         },
    //         {
    //             path: 'completed',
    //             component: ListSettledClaimsComponent,
    //              data: { breadcrumb: 'Settled Claims' }
    //         },
    //         {
    //             path: ':id',
    //             component: ViewSingleNewClaimComponent,
    //              data: { breadcrumb: 'View' }
    //         },
    //     ]
    // }
];

export const TravelRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
