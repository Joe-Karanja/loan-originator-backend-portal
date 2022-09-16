import { LineComponent } from './line/line.component';
import { ChartsModule } from './../pages/charts/charts.module';
import { AnalyticsRoutingModule } from './analytics-routing';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { D1Component } from './d1/d1/d1.component';
import { NumberCardChartComponent } from './d1/components/number-card-chart/number-card-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatientVisitsTrendComponent } from './d1/components/patient-visits-trend/patient-visits-trend.component';
import { D2Component } from './d2/d2/d2.component';
import { D3Component } from './d3/d3/d3.component';
import { D4Component } from './d4/d4/d4.component';
import { ClaimCountsComponent } from './d2/components/claim-counts/claim-counts.component';
import { PremiumPerProductValueComponent } from './general-dashboard/components/premium-per-product-value/premium-per-product-value.component';
import { GeneralDashboardComponent } from './general-dashboard/general-dashboard.component';
import { ProductCategoryChartComponent } from './general-dashboard/components/product-category-chart/product-category-chart.component';
import { MotorComprehensiveApplicationsDashboardComponent } from './motor-comprehensive-applications-dashboard/motor-comprehensive-applications-dashboard.component';
import { InvestmentDashboardsComponent } from './investment-dashboards/investment-dashboards.component';
import { InvCategoryPieChartComponent } from './investment-dashboards/inv-category-pie-chart/inv-category-pie-chart.component';
import { PensionComponent } from './pension/pension.component';
import { CorporateDashboardComponent } from './corporate-dashboard/corporate-dashboard.component';
import { ApplicationsByCorporateComponent } from './investment-dashboards/applications-by-corporate/applications-by-corporate.component';
import {BsDatepickerModule} from 'ngx-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        AnalyticsRoutingModule,
        NgxChartsModule,
        BsDatepickerModule,

    ],
  declarations: [
   D1Component,
   NumberCardChartComponent,
   PatientVisitsTrendComponent,
   D2Component,
   D3Component,
   D4Component,
   ClaimCountsComponent,
   GeneralDashboardComponent,
   PremiumPerProductValueComponent,
   ProductCategoryChartComponent,
   MotorComprehensiveApplicationsDashboardComponent,
   InvestmentDashboardsComponent,
   InvCategoryPieChartComponent,
   PensionComponent,
   CorporateDashboardComponent,
   LineComponent,
   ApplicationsByCorporateComponent
  ],
  entryComponents: [
  ],
  exports:[
    CorporateDashboardComponent,

  ]
})
export class AnalyticsModule { }

