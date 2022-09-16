import {AuthGuard} from './shared/services/auth.guard';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PagesComponent} from './pages/pages.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SearchComponent} from './pages/search/search.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Dashboard'}
            },
            {
                path: '', redirectTo: 'analytics', pathMatch: 'full',
                data: {breadcrumb: 'General Dashboard'}
            },
            {
                path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsModule',
                data: {breadcrumb: 'Dashboard'}
            },
            {
                path: 'loans',
                loadChildren: './loans/loans.module#LoansModule',
                data: {breadcrumb: 'Loans Module'}
            },
            {
                path: 'tenants',
                loadChildren: './tenants/tenants.module#TenantsModule',
                data: {breadcrumb: 'Tenants Module'}
            },
            {
                path: 'motor',
                loadChildren: './motor/motor.module#MotorModule',
                data: {breadcrumb: 'Motor Vehicle Insurance Module'}
            },
            {
                path: 'investments',
                loadChildren: './investment/investment.module#InvestmentModule',
                data: {breadcrumb: 'Investment Module'}
            },
            {
                path: 'customers',
                loadChildren: './customers/customer.module#CustomerModule',
                data: {breadcrumb: 'Customers Module'}
            },
            {
                path: 'applications',
                loadChildren: './applications/applications.module#ApplicationsModule',
                data: {breadcrumb: 'Applications Module'}
            },
            {
                path: 'valuations',
                loadChildren: './valuations/valuations.module#ValuationsModule',
                data: {breadcrumb: 'Corporate Module'}
            },
            {
                path: 'claims',
                loadChildren: './claims/claims.module#ClaimsModule',
                data: {breadcrumb: 'Claims Module'}
            },
            {
                path: 'employees',
                loadChildren: './valuers/valuers.module#ValuersModule',
                data: {breadcrumb: 'Employees Module'}
            },
            {
                path: 'list-corporates',

                loadChildren: './manage-corporate/manage-corporate.module#ManageCorporateModule',
                data: {breadcrumb: 'Corporate Module'}
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                data: {breadcrumb: 'Users Module'}
            },
            {
                path: 'workflow',
                loadChildren: './workflow/workflow.module#WorkflowModule',
                data: {breadcrumb: 'Workflow Module'}
            },
            {
                path: 'configs',
                loadChildren: './configs/configs.module#ConfigsModule',
                data: {breadcrumb: ''}
            },
            {path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', data: {breadcrumb: 'Membership'}},
            {path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: {breadcrumb: 'UI'}},
            {
                path: 'form-elements',
                loadChildren: './pages/form-elements/form-elements.module#FormElementsModule',
                data: {breadcrumb: 'Form Elements'}
            },
            {path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: {breadcrumb: 'Tables'}},
            {path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: {breadcrumb: 'Tools'}},
            {path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: {breadcrumb: 'Calendar'}},
            {path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: {breadcrumb: 'Mailbox'}},
            {path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: {breadcrumb: 'Maps'}},
            {path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: {breadcrumb: 'Charts'}},
            {
                path: 'dynamic-menu',
                loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule',
                data: {breadcrumb: 'Dynamic Menu'}
            },
            {path: 'blank', component: BlankComponent, data: {breadcrumb: 'Blank page'}},
            {path: 'search', component: SearchComponent, data: {breadcrumb: 'Search'}},

            {
                path: 'rbac',
                loadChildren: './rbac/rbac.module#RbacModule',
                data: {breadcrumb: 'RBAC Module'}
            },
        ]
    },
    {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterModule'},
    {path: '**', component: NotFoundComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    // useHash: true
});
