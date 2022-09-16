import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListValuersComponent } from './manage-valuers/list-valuers/list-valuers.component';
import { ViewValuerComponent } from './manage-valuers/view-valuer/view-valuer.component';
import {ListInactiveEmployeesComponent} from './manage-valuers/inactive-employees/list-inactive-employees/list-inactive-employees.component';
import {ViewInactiveEmployeeComponent} from './manage-valuers/inactive-employees/view-inactive-employee/view-inactive-employee.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListValuersComponent,
        data: {
            title: 'Employees'
        }
    },
    {
        path: 'inactive/list',
        component: ListInactiveEmployeesComponent,
        data: {
            title: 'Employees'
        }
    },

    {
        path: 'inactive/:id',
        component: ViewInactiveEmployeeComponent,
        data: {
            title: 'Inactive Employee'
        }
    },

    {
        path: ':id',
        component: ViewValuerComponent,
        data: {
            title: 'Employee'
        }
    }
];

export const ValuersRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
