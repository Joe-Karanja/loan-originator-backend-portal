import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { ViewSingleApplicationComponent } from './view-single-application/view-single-application.component';
import { ListRescueCallsComponent } from './list-rescue-calls/list-rescue-calls.component';
import { ListPersonalAccidentCoversComponent } from './list-personal-accident-covers/list-personal-accident-covers.component';
import { ListTravelCoversComponent } from './list-travel-covers/list-travel-covers.component';
@NgModule({
  imports: [
    SharedModule,
    ApplicationsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
  ListApplicationsComponent,
  ViewSingleApplicationComponent,
  ListRescueCallsComponent,
  ListPersonalAccidentCoversComponent,
  ListTravelCoversComponent]
  ,
  entryComponents: [
  ],
})
export class ApplicationsModule { }

