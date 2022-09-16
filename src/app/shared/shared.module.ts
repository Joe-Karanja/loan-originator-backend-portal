import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineComponent } from '../analytics/line/line.component';
import { CorporateDashboardComponent } from './../analytics/corporate-dashboard/corporate-dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './../pages/maps/google-maps/google-maps.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from './../theme/pipes/pipes.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LabelBooleanComponent } from './components/label-boolean/label-boolean.component';
import { LabelCompletedComponent } from './components/label-completed/label-completed.component';
import { LabelActiveComponent } from './components/label-active/label-active.component';
import { LabelOnlineComponent } from './components/label-online/label-online.component';
import { LabelPassedComponent } from './components/label-passed/label-passed.component';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LabelBooleanComponent,
    LabelCompletedComponent,
    LabelActiveComponent,
    GoogleMapsComponent,
    LabelOnlineComponent,
    LabelPassedComponent,
    // LineComponent
  ],
  entryComponents: [
    LabelBooleanComponent,
    LabelCompletedComponent,
    LabelActiveComponent,
    LabelOnlineComponent,
    LabelPassedComponent,
    
  ],
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    NgbModule,
    Ng2SmartTableModule,
    NgxChartsModule,
    MultiselectDropdownModule,
    // LineComponent,

    //   SweetAlert2Module.forRoot({
    //     buttonsStyling: false,
    //     customClass: 'modal-content',
    //     confirmButtonClass: 'btn btn-primary',
    //     cancelButtonClass: 'btn'
    // }),
    AgmCoreModule,
    // CorporateDashboardComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    NgbModule,
    Ng2SmartTableModule,
    MultiselectDropdownModule,
    LabelBooleanComponent,
    LabelCompletedComponent,
    LabelActiveComponent,
    LabelOnlineComponent,
    LabelPassedComponent,
    GoogleMapsComponent,
    // LineComponent
    // CorporateDashboardComponent,
    // CorporateDashboardComponent,
  ]
})
export class SharedModule {
  constructor() {
  }
}
