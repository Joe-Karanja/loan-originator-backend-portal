import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
const routes: Routes = [
  
          
            {
                path: 'list',
                 component: ListCustomersComponent,
                 data: { breadcrumb: 'List All Customers' }
            },
         
    
  
];

export const CustomerRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
