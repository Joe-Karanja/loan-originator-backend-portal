import { ViewCorporateComponent } from './active-corporates/view-corporate/view-corporate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CorporatesComponent} from './active-corporates/list-corporates/corporates.component';
import {ListInactiveCorporatesComponent} from './inactive-corporates/list-inactive-corporates/list-inactive-corporates.component';
const routes: Routes = [
  {
    path: 'list',
    component: CorporatesComponent
  },
  {
    path: 'inactive/list',
    component: ListInactiveCorporatesComponent
  },
  {
    path: ':id',
    component: ViewCorporateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCorporateRoutingModule { }
