import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUnitTrustApplicationsComponent } from './manage-unit-trusts/list-unit-trust-applications/list-unit-trust-applications.component';
import { ListPrivateWealthApplicationsComponent } from './manage-private-wealth/list-private-wealth-applications/list-private-wealth-applications.component';
import { ListInstitutionalInvestmentsComponent } from './manage-institutional-investments/list-institutional-investments/list-institutional-investments.component';
const routes: Routes = [
    {
        path: 'unit-trusts',
        component: ListUnitTrustApplicationsComponent,
        data: { breadcrumb: 'Unit Trust Applications' }
    },
    {
        path: 'private-wealth',
        component: ListPrivateWealthApplicationsComponent,
        data: { breadcrumb: 'Private Wealth Investment Applications' }
    },
    {
        path: 'institutional-investors',
        component: ListInstitutionalInvestmentsComponent,
        data: { breadcrumb: 'Institutional Investments Applications' }
    },
];

export const InvestmentRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
