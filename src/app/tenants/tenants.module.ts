import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { TenantsRoutingModule } from './tenants-routing';
import { TenantsListComponent } from './manage-tenants/tenants-list/tenants-list.component';
import { TenantAddComponent } from './manage-tenants/tenant-add/tenant-add.component';
import { ViewSingleTenantComponent } from './manage-tenants/view-single-tenant/view-single-tenant.component';
import { TenantUssdCodesListComponent } from './manage-tenants/view-single-tenant/tenant-ussd-codes-list/tenant-ussd-codes-list.component';
import { TenantUssdCodeAddComponent } from './manage-tenants/view-single-tenant/tenant-ussd-code-add/tenant-ussd-code-add.component';
import { TenantUssdMenusComponent } from './manage-tenants/view-single-tenant/tenant-ussd-menus/tenant-ussd-menus.component';
import { TenantUssdMenuAddComponent } from './manage-tenants/view-single-tenant/tenant-ussd-menu-add/tenant-ussd-menu-add.component';
import { TenantCurrenciesListComponent } from './manage-tenants/view-single-tenant/manage-currencies/tenant-currencies-list/tenant-currencies-list.component';
import { TenantLanguagesListComponent } from './manage-tenants/view-single-tenant/manage-languages/tenant-languages-list/tenant-languages-list.component';
import { TenantLanguagesAddComponent } from './manage-tenants/view-single-tenant/manage-languages/tenant-languages-add/tenant-languages-add.component';
import { AddTenantCurrencyComponent } from './manage-tenants/view-single-tenant/manage-currencies/add-tenant-currency/add-tenant-currency.component';
import { ListTenantAddressesComponent } from './manage-tenants/view-single-tenant/manage-addresses/list-tenant-addresses/list-tenant-addresses.component';
import { AddTenantAddressComponent } from './manage-tenants/view-single-tenant/manage-addresses/add-tenant-address/add-tenant-address.component';
import { ListTenantCustomersComponent } from './manage-tenants/view-single-tenant/manage-customers/list-tenant-customers/list-tenant-customers.component';
import { AddTenantCustomerComponent } from './manage-tenants/view-single-tenant/manage-customers/add-tenant-customer/add-tenant-customer.component';
import { ListTenantTransactionsComponent } from './manage-tenants/view-single-tenant/manage-transactions/list-tenant-transactions/list-tenant-transactions.component';
import { ListTenantNotificationTemplatesComponent } from './manage-tenants/view-single-tenant/notification-templates/list-tenant-notification-templates/list-tenant-notification-templates.component';
import { AddTenantNotificationTemplateComponent } from './manage-tenants/view-single-tenant/notification-templates/add-tenant-notification-template/add-tenant-notification-template.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ListUssdSessionsComponent } from './manage-tenants/view-single-tenant/manage-ussd-sessions/list-ussd-sessions/list-ussd-sessions.component';
import { ViewRequestsInASessionComponent } from './manage-tenants/view-single-tenant/manage-ussd-sessions/view-requests-in-a-session/view-requests-in-a-session.component';
import { PaybillNumbersListComponent } from './manage-tenants/view-single-tenant/manage-pay-bills/paybill-numbers-list/paybill-numbers-list.component';
import { PaybillNumberAddComponent } from './manage-tenants/view-single-tenant/manage-pay-bills/paybill-number-add/paybill-number-add.component';
import { ListTenantTransactionServicesComponent } from './manage-tenants/view-single-tenant/manage-transaction-services/list-tenant-transaction-services/list-tenant-transaction-services.component';
import { TenantTransactionServiceAddComponent } from './manage-tenants/view-single-tenant/manage-transaction-services/tenant-transaction-service-add/tenant-transaction-service-add.component';
import { ListTranslationsComponent } from './manage-tenants/view-single-tenant/manage-translations/list-translations/list-translations.component';
import { AddTranslationComponent } from './manage-tenants/view-single-tenant/manage-translations/add-translation/add-translation.component';
@NgModule({
  imports: [
    SharedModule,
    TenantsRoutingModule,
    ModalModule.forRoot(),
    CKEditorModule
  ],
  declarations: [
  TenantsListComponent,
  TenantAddComponent,
  ViewSingleTenantComponent,
  TenantUssdCodesListComponent,
  TenantUssdCodeAddComponent,
  TenantUssdMenusComponent,
  TenantUssdMenuAddComponent,
  TenantCurrenciesListComponent,
  TenantLanguagesListComponent,
  TenantLanguagesAddComponent,
  AddTenantCurrencyComponent,
  ListTenantAddressesComponent,
  AddTenantAddressComponent,
  ListTenantCustomersComponent,
  AddTenantCustomerComponent,
  ListTenantTransactionsComponent,
  ListTenantNotificationTemplatesComponent,
  AddTenantNotificationTemplateComponent,
  ListUssdSessionsComponent,
  ViewRequestsInASessionComponent,
  PaybillNumbersListComponent,
  PaybillNumberAddComponent,
  ListTenantTransactionServicesComponent,
  TenantTransactionServiceAddComponent,
  ListTranslationsComponent,
  AddTranslationComponent],
  entryComponents: [
    TenantAddComponent,
    TenantUssdCodeAddComponent,
    TenantUssdMenuAddComponent,
    TenantLanguagesAddComponent,
    AddTenantCurrencyComponent,
    AddTenantAddressComponent,
    AddTenantNotificationTemplateComponent,
    ViewRequestsInASessionComponent,
    PaybillNumberAddComponent,
    TenantTransactionServiceAddComponent,
    ListTranslationsComponent,
    AddTranslationComponent
  ],
})
export class TenantsModule { }

