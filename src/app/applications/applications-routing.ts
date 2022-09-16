import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { ViewSingleApplicationComponent } from './view-single-application/view-single-application.component';
import { ListRescueCallsComponent } from './list-rescue-calls/list-rescue-calls.component';
import { ListPersonalAccidentCoversComponent } from './list-personal-accident-covers/list-personal-accident-covers.component';
import { ListTravelCoversComponent } from './list-travel-covers/list-travel-covers.component';
const routes: Routes = [
    {
        path: 'rescues',
        component: ListRescueCallsComponent,
        data: {
            title: '24/7 Rescue Calls'
        }
    },
    {
        path: 'pac',
        component: ListPersonalAccidentCoversComponent,
        data: {
            title: 'Personal Accident Covers'
        }
    },
    {
        path: 'travel',
         component: ListTravelCoversComponent,
        data: {
            title: 'Travel Covers'
        }
    },
    {
        path: 'all',
        component: ListApplicationsComponent,
        data: {
            title: 'Applications Pending Approval'
        }
    },
      {
        path: ':id',
        component: ViewSingleApplicationComponent,
        data: {
            title: 'Single'
        }
    },
  
];

export const ApplicationsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
