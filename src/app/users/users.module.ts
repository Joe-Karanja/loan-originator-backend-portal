import { UsersRoutingModule } from './users-routing';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AuditTrailListComponent } from './audit-trail/audit-trail-list/audit-trail-list.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { ViewAuditTrailComponent } from './audit-trail/view-audit-trail/view-audit-trail.component';
import {MatCardModule} from '@angular/material';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule,
        ModalModule.forRoot(),
        MatCardModule,
    ],
  declarations: [
    UsersListComponent,
    AuditTrailListComponent,
    CreateUserComponent,
    ViewUserComponent,
    ViewAuditTrailComponent
  ],
  entryComponents: [
    CreateUserComponent,
    ViewAuditTrailComponent,
    ViewUserComponent
  ],
})
export class UsersModule { }

