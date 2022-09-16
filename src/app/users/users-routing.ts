import { AuditTrailListComponent } from './audit-trail/audit-trail-list/audit-trail-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
        path: 'list',
        component: UsersListComponent,
        data: {
            breadcrumb: 'All Users',
            title: 'Users'
        }
    },
    {
        path: 'trail',
        component: AuditTrailListComponent,
        data: {
            breadcrumb: 'Audit Trails',
            title: 'Audit Trails'
        }
    },
];

export const UsersRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
