import { CorporateDashboardComponent } from './corporate-dashboard/corporate-dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D1Component } from './d1/d1/d1.component';
import { D2Component } from './d2/d2/d2.component';
import { D3Component } from './d3/d3/d3.component';
import { GeneralDashboardComponent } from './general-dashboard/general-dashboard.component';
import { MotorComprehensiveApplicationsDashboardComponent } from './motor-comprehensive-applications-dashboard/motor-comprehensive-applications-dashboard.component';
import { InvestmentDashboardsComponent } from './investment-dashboards/investment-dashboards.component';
import { PensionComponent } from './pension/pension.component';
const routes: Routes = [
    {
        path: '',
        // component: GeneralDashboardComponent,
       // component: MotorComprehensiveApplicationsDashboardComponent,
        component: InvestmentDashboardsComponent,
        data: {
            breadcrumb: 'Investment Dashboards',
            title: 'Investment Dashboard'
        }
    },
    {
        path: 'corporate',
        component: CorporateDashboardComponent,
        data: {
            breadcrumb: 'Corporate',
            title: 'Corporate Dashboard'
        }
    },
    {
        path: 'pension',
        component: PensionComponent,
        data: {
            breadcrumb: 'Pension Dashboards',
            title: 'Pension Dashboard'
        }
    },
    {
        path: 'motor',
        component: D1Component,
        data: {
            breadcrumb: 'Motor Vehicle Cover Applications',
            title: 'Dashboard'
        }
    },
    {
        path: 'claims',
        component: D2Component,
        data: {
            breadcrumb: 'Dashboard',
            title: 'Dashboard'
        }
    },
    {
        path: 'personal',
        component: D3Component,
        data: {
            breadcrumb: 'Personal Inssurance Cover',
            title: 'Dashboard'
        }
    },
];

export const AnalyticsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
