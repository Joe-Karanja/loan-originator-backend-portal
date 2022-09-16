import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SharedModule} from '../shared/shared.module';
import {LoansRoutingModule} from './loans-routing';
import {LoanApplicationsComponent} from './loan-applications/loan-applications.component';
import {ViewSingleLoanApplicationComponent} from './view-single-loan-application/view-single-loan-application.component';
import {OpenDocDialogComponent} from './view-single-loan-application/open-doc-dialog/open-doc-dialog.component';
import {CompanyLoansComponent} from './company-loans/company-loans.component';
import {OpenAdditionalApprovalsDialogComponent} from './view-single-loan-application/open-additional-approvals-dialog/open-additional-approvals-dialog.component';
import {BusinessLoanApplicationsComponent} from './business-loan-applications/business-loan-applications.component';
import {OpenBusinessDocDialogComponent} from './view-business-loan-application/open-doc-dialog/open-doc-dialog.component';
import {OpenAdditionalApprovalsDialogForBusinessComponent} from './view-business-loan-application/open-additional-approvals-dialog/open-additional-approvals-dialog.component';
import {ViewBusinessLoanApplicationComponent} from './view-business-loan-application/view-single-loan-application.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NgZorroAntdModule, NzDropDownModule} from 'ng-zorro-antd';
import {BusinessLoanAssessmentComponent} from './business-loan-assessment/business-loan-assessment.component';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {MatFormFieldModule, MatInputModule, MatStepperModule} from '@angular/material';
import { DateFilterComponent } from './services/DateFilterComponent';
import {NbDatepickerModule} from '@nebular/theme';
import { LoanCyclesComponent } from './loan-cylces/corporate-cycles/loan-cycles/loan-cycles.component';
import {ListLoanCyclesComponent} from './loan-cylces/corporate-cycles/list-loan-cycles/list-loan-cycles.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
// tslint:disable-next-line:max-line-length
import { OpenApproveRecommendDialogComponent } from './view-single-loan-application/open-approve-recommend-dialog/open-approve-recommend-dialog.component';
import {NgxSelectModule} from 'ngx-select-ex';
import {TenantAddComponent} from '../tenants/manage-tenants/tenant-add/tenant-add.component';
import {CloseCycleComponent} from './loan-cylces/corporate-cycles/close-cycle/close-cycle.component';
import {CreateCycleComponent} from './loan-cylces/corporate-cycles/create-cycle/create-cycle.component';
import {ListBankLoanCyclesComponent} from './loan-cylces/bank-cycles/list-loan-cycles/list-loan-cycles.component';
import { LoanCyclesBankComponent } from './loan-cylces/bank-cycles/loan-cycles/loan-cycles.component';
import {OpenConfirmPaymentDialogComponent} from './view-single-loan-application/open-confirm-payment-dialog/open-confirm-payment-dialog.component';



@NgModule({
    imports: [
        SharedModule,
        LoansRoutingModule,
        ModalModule.forRoot(),
        NzTableModule,
        NgZorroAntdModule,
        NzDropDownModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        NbDatepickerModule,
        NgxSelectModule,
        BsDatepickerModule
    ],
    declarations: [
        LoanApplicationsComponent,
        BusinessLoanApplicationsComponent,
        ViewSingleLoanApplicationComponent,
        ViewBusinessLoanApplicationComponent,
        OpenDocDialogComponent,
        OpenBusinessDocDialogComponent,
        OpenAdditionalApprovalsDialogComponent,
        OpenAdditionalApprovalsDialogForBusinessComponent,
        CompanyLoansComponent,
        BusinessLoanAssessmentComponent,
        CreateAssessmentComponent,
        CreateCycleComponent,
        DateFilterComponent,
        OpenApproveRecommendDialogComponent,
        OpenConfirmPaymentDialogComponent,
        LoanCyclesComponent,
        LoanCyclesBankComponent,
        ListLoanCyclesComponent,
        ListBankLoanCyclesComponent,
        CloseCycleComponent
    ],
    entryComponents: [
        OpenDocDialogComponent,
        OpenBusinessDocDialogComponent,
        OpenAdditionalApprovalsDialogComponent,
        OpenAdditionalApprovalsDialogForBusinessComponent,
        BusinessLoanApplicationsComponent,
        BusinessLoanAssessmentComponent,
        CreateAssessmentComponent,
        CreateCycleComponent,
        DateFilterComponent,
        OpenApproveRecommendDialogComponent,
        OpenConfirmPaymentDialogComponent,
        CloseCycleComponent
    ],
})
export class LoansModule {
}

