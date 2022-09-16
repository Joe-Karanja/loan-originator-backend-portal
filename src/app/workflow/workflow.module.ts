import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { WorkflowRoutingModule } from './workflow-routing';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { ViewSingleWorkflowComponent } from './view-single-workflow/view-single-workflow.component';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';

@NgModule({
  imports: [
    SharedModule,
    WorkflowRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
 WorkflowListComponent,
 ViewSingleWorkflowComponent,
 AddWorkflowComponent] ,
  entryComponents: [
    AddWorkflowComponent
  ],
})
export class WorkflowModule { }

