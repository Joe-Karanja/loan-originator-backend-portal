import {SharedModule} from './../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageCorporateRoutingModule} from './manage-corporate-routing.module';
import {CorporatesComponent} from './active-corporates/list-corporates/corporates.component';
import {ViewCorporateComponent} from './active-corporates/view-corporate/view-corporate.component';
import {CreateAdminDialogComponent} from './active-corporates/view-corporate/create-admin-dialog/create-admin-dialog.component';
import {CreateCompanyDialogComponent} from './create-company-dialog/create-company-dialog.component';
import {ManageCorporateAdminsComponent} from './active-corporates/view-corporate/manage-corporate-admins/manage-corporate-admins.component';
import {ListInactiveCorporatesComponent} from './inactive-corporates/list-inactive-corporates/list-inactive-corporates.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
    declarations: [
        CorporatesComponent,
        ViewCorporateComponent,
        ListInactiveCorporatesComponent,
        CreateAdminDialogComponent,
        CreateCompanyDialogComponent,
        ManageCorporateAdminsComponent],
    imports: [
        CommonModule,
        SharedModule,
        //ValuersModule,
        ManageCorporateRoutingModule,
        MatTabsModule
    ],
    entryComponents: [
        CreateAdminDialogComponent,
        CreateCompanyDialogComponent
    ]
})
export class ManageCorporateModule {
}
