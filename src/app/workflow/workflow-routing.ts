import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { ViewSingleWorkflowComponent } from './view-single-workflow/view-single-workflow.component';
const routes: Routes = [
    {
        path: 'list',
         component: WorkflowListComponent,
        data: {
            title: 'All Workflows'
        }
    },
    {
        path: ':id',
       component: ViewSingleWorkflowComponent,
        data: {
            title: 'Workflow'
        }
    },
];

export const WorkflowRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
