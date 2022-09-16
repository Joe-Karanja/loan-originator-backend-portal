import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantsListComponent } from './manage-tenants/tenants-list/tenants-list.component';
import { ViewSingleTenantComponent } from './manage-tenants/view-single-tenant/view-single-tenant.component';
const routes: Routes = [
    {
        path: 'list',
        component: TenantsListComponent,
        data: {
            title: 'Tenants List'
        }
    },
    {
        path: ':id',
        component: ViewSingleTenantComponent,
        data: {
            breadcrumb: 'View Tenant',
            title: 'Tenant'
        }
    },
];

export const TenantsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
