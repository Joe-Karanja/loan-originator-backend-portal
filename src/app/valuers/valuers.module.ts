import { LabelBooleanComponent } from './../shared/components/label-boolean/label-boolean.component';
import { LabelCompletedComponent } from './../shared/components/label-completed/label-completed.component';
import { AnalyticsModule } from './../analytics/analytics.module';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { ValuersRoutingModule } from './valuers-routing';
import { ListValuersComponent } from './manage-valuers/list-valuers/list-valuers.component';
import { ListInactiveEmployeesComponent } from './manage-valuers/inactive-employees/list-inactive-employees/list-inactive-employees.component';
import { AddValuerComponent } from './manage-valuers/add-valuer/add-valuer.component';
import { ViewValuerComponent } from './manage-valuers/view-valuer/view-valuer.component';
import { AddValuerUserComponent } from './manage-valuers/add-valuer-user/add-valuer-user.component';
import {MatCardModule, MatGridListModule, MatTabsModule} from '@angular/material';
import {ViewInactiveEmployeeComponent} from './manage-valuers/inactive-employees/view-inactive-employee/view-inactive-employee.component';
@NgModule({
    imports: [
        SharedModule,
        ValuersRoutingModule,
        AnalyticsModule,
        ModalModule.forRoot(),
        MatTabsModule,
        MatCardModule,
        MatGridListModule
    ],
  declarations: [
      ListValuersComponent,
      ListInactiveEmployeesComponent,
      AddValuerComponent,
      ViewValuerComponent,
      ViewInactiveEmployeeComponent,
      AddValuerUserComponent
  ]
  ,
  entryComponents: [
    AddValuerComponent,
    AddValuerUserComponent,
    // LabelCompletedComponent,
    // LabelBooleanComponent
  ],
  exports: [
    AddValuerComponent, AddValuerUserComponent
  ]
})
export class ValuersModule { }

