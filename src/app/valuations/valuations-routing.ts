import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPendingValuationsComponent } from './list-pending-valuations/list-pending-valuations.component';
import { ListDoneValuationsComponent } from './list-done-valuations/list-done-valuations.component';
import { DoValuationComponent } from './do-valuation/do-valuation.component';
const routes: Routes = [
  
    {
        path: 'pending',
        component: ListPendingValuationsComponent,
        data: {
            title: 'Pending Valuations'
        }
    },
      {
        path: 'valued',
       component: ListDoneValuationsComponent,
        data: {
            title: 'Valued'
        }
    },
    {
        path: ':id',
        component: DoValuationComponent,
        data: {
            title: 'Single'
        }
    },
  
];

export const ValuationsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
