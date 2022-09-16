import {CompanyLoansComponent} from './company-loans/company-loans.component';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoanApplicationsComponent} from './loan-applications/loan-applications.component';
import {ViewSingleLoanApplicationComponent} from './view-single-loan-application/view-single-loan-application.component';
import {BusinessLoanApplicationsComponent} from './business-loan-applications/business-loan-applications.component';
import {ViewBusinessLoanApplicationComponent} from './view-business-loan-application/view-single-loan-application.component';
import {BusinessLoanAssessmentComponent} from './business-loan-assessment/business-loan-assessment.component';
import {DateFilterComponent} from './services/DateFilterComponent';
import {LoanCyclesComponent} from './loan-cylces/corporate-cycles/loan-cycles/loan-cycles.component';
import {ListLoanCyclesComponent} from './loan-cylces/corporate-cycles/list-loan-cycles/list-loan-cycles.component';
import {ListBankLoanCyclesComponent} from './loan-cylces/bank-cycles/list-loan-cycles/list-loan-cycles.component';
import {LoanCyclesBankComponent} from './loan-cylces/bank-cycles/loan-cycles/loan-cycles.component';


const routes: Routes = [
    {
        path: 'test',
        component: DateFilterComponent,
        data: {
            breadcrumb: 'View Application',
            title: 'Loan Application'
        }
    },
    {
        path: 'applications',
        component: LoanApplicationsComponent,
        data: {
            title: 'Loan Applications'
        }
    },
    {
        path: 'business-loan-applications',
        component: BusinessLoanApplicationsComponent,
        data: {
            title: 'Business Loan Applications'
        }
    },
    {
        path: 'business-loan-assessment',
        component: BusinessLoanAssessmentComponent,
        data: {
            title: 'Business Assessment'
        }
    },

    {
        path: 'org',
        component: CompanyLoansComponent,
        data: {
            title: 'Company Loans'
        }
    },
    {
        path: 'cycles',
        component: ListLoanCyclesComponent,
        data: {
            title: 'Loan Cycles'
        }
    },
    {
        path: 'bank/cycles',
        component: ListBankLoanCyclesComponent,
        data: {
            title: 'Loan Cycles'
        }
    },
    {
        path: 'bank/cycles/:id',
        component: LoanCyclesBankComponent,
        data: {
            title: 'View Loan Cycle'
        }
    },

    {
        path: 'cycles/:id',
        component: LoanCyclesComponent,
        data: {
            title: 'View Loan Cycle'
        }
    },



    {
        path: ':id',
        component: ViewSingleLoanApplicationComponent,
        data: {
            breadcrumb: 'View Application',
            title: 'Loan Application'
        }
    },
    {
        path: 'business/:id',
        component: ViewBusinessLoanApplicationComponent,
        data: {
            breadcrumb: 'View Application',
            title: 'Loan Application'
        },
    }
];


export const LoansRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
