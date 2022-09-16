import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClaimsComponent } from './list-claims/list-claims.component';
import { ApprovedClaimsComponent } from './approved-claims/approved-claims.component';
import { ViewSingleClaimComponent } from './view-single-claim/view-single-claim.component';
const routes: Routes = [
    {
        path: 'pending',
        component: ListClaimsComponent,
        data: {
            title: 'Pending Claims'
        }
    },
    {
        path: 'approved',
        component: ApprovedClaimsComponent,
        data: {
            breadcrumb: 'Approved Claims',
            title: 'Approved Claims'
        }
    },
    {
        path: ':id',
        component: ViewSingleClaimComponent,
        data: {
            title: 'Claim'
        }
    },
];

export const ClaimsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
