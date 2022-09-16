import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
    selector: 'app-loan-applications',
    templateUrl: './business-loan-applications.component.html',
    styleUrls: ['./business-loan-applications.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class BusinessLoanApplicationsComponent implements OnInit {
    public status = 'submitted';
    public formData;
    public modalRef: NgbModalRef;
    public settings;
    dataSet: any;

    public isLoaded = false;

    public products: any;
    public categories: any;
    public subcategories: any;
    org: any;
    public loggedInAs: string;
    private processedLoan: boolean;
    private newArray: any[] = [];

    constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
                public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public toastrService: ToastrService) {
        this.settings = {
            selectMode: 'single',  // single|multi
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                columnTitle: 'Actions',
                add: false,
                edit: false,
                delete: false,
                custom: [
                    {name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;'}],
                position: 'right' // left|right
            },
            delete: {
                deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
                confirmDelete: true
            },
            noDataMessage: 'No data found',
            columns: {
                // company_name: {
                //   title: 'Applicant Name',
                //   type: 'string'
                // },
                id: {
                    title: 'ID',
                    type: 'string',
                    filter: false
                },
                businessName: {
                    title: 'Business Name',
                    type: 'string',
                    filter: false
                },
                tel: {
                    title: 'Mobile Number',
                    type: 'string',
                    filter: false
                },
                product_name: {
                    title: 'Loan Type',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        return 'Business Loan';
                    },
                },
                loanAmount: {
                    title: 'Loan Amount',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes. ');
                        return formatted;
                    },
                },
                // score: {
                //     title: 'Score',
                //     type: 'string',
                //     filter: false,
                //     valuePrepareFunction: (value) => {
                //
                //         if (this.processedLoan) {
                //             console.log(this.newArray);
                //             return this.newArray[0].score;
                //         } else {
                //             return '---';
                //         }
                //     },
                // },
                // class: {
                //     title: 'Class',
                //     type: 'string',
                //     filter: false,
                //     valuePrepareFunction: (value) => {
                //         if (this.processedLoan) {
                //
                //             if (this.newArray[0].marginRate === 3) { return 'D'; }
                //             if (this.newArray[0].marginRate === 2) { return 'C'; }
                //             if (this.newArray[0].marginRate === 1) { return 'B'; }
                //             if (this.newArray[0].marginRate === 0) { return 'A'; }
                //         } else {
                //             return '---';
                //         }
                //     },
                // },
                // cb_baseRate: {
                //     title: 'CB Base rate',
                //     type: 'string',
                //     filter: false,
                //     valuePrepareFunction: (value) => {
                //         if (this.processedLoan) {
                //             console.log(this.newArray);
                //             if (this.newArray[0].marginRate > 0) { return `CB Base rate + margin of ${this.newArray[0].marginRate}%`; }
                //             if (this.newArray[0].marginRate === 0) { return `CB Base rate (X%)`; }
                //         } else {
                //             return '---';
                //         }
                //     },
                // },

                // amount_qualified: {
                //     title: 'Amount Qualified',
                //     type: 'string',
                //     filter: false,
                //     valuePrepareFunction: (value) => {
                //         const formatted = this.currencyPipe.transform('240000', 'Kes. ');
                //         return formatted;
                //     },
                // },

                createdDate: {
                    title: 'Application Date',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (date) => {
                        const raw = new Date(date);
                        const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
                        return formatted;
                    },
                },
            },
            pager: {
                total: 100,
                display: true,
                perPage: 15
            }
        };
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
        this.org = this._httpService.Username();
    }

    public ngOnChanges() {
    }

    ngOnInit() {
        this.loadData();
        this.loggedInAs = localStorage.getItem('logged_in_as');
        if (this.loggedInAs == 'bank') {
            this.status = 'verified';
        }
    }

    public openModal(formData) {
        this.formData = formData;
        //  this.modalRef = this.modalService.open(TenantAddComponent);
        if (formData) {
            this.modalRef.componentInstance.title = 'Edit Tenant ';
        } else {
            this.modalRef.componentInstance.title = 'Add Tenant';
        }
        this.modalRef.componentInstance.formData = this.formData;
        this.modalRef.result.then((result) => {
            if (result === 'success') {
                this.loadData();
            }
        }, (reason) => {
        });
    }

    public onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this._httpService.delete('tenants/tenant/' + event.data.id).subscribe(
                result => {
                    if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
                        this.toastrService.success(event.data.id, 'Deleted!');
                        this.loadData();
                    } else {
                        this.toastrService.error(event.data.id, 'Failed to Delete!');
                    }
                }
            );
        } else {
            event.confirm.reject();
        }
    }

    public onCustomAction(event: any): void {
        switch (event.action) {
            case 'viewRecord':
                this.viewRecord(event.data);
                break;
            case 'deleteRecord':
                this.onDeleteConfirm(event);
                break;
            case 'editRecord':
                this.openModal(event.data);
                break;
            default:
                break;
        }
    }

    public toggleStatus(status: string): void {
        this.status = status;
        this.dataSet = this.dataSet.filter(el => el.status_desc === status);
        console.log(this.dataSet);
        if (status === 'submitted') {
            this.loadData();
        }

    }

    async getProcessedApplications() {
        const arrayOfLoansWithCalcs = this.dataSet.map(item => item.id);

        const returnNewLoanData = async () => {
            for (const item of arrayOfLoansWithCalcs) {
                this._httpService.scoresGet(`loans/loanAnalysis/${item}`).subscribe(
                    result => {
                        console.log('result');
                        console.log(result);
                        const ans = result.data;
                        this.newArray.push({id: item, score: ans.score, marginRate: ans.marginRate, baseRate: ans.baseRate});
                    },
                );
            }
        };

        await returnNewLoanData();

        console.log('newArray');
        console.log(this.newArray);

        this.isLoaded = false;

        this.processedLoan = true;

        this._httpService.scoresGet('loans/products').subscribe(
            result => {
                console.log(result);
                this.dataSet = [{
                    id: 11,
                    businessName: 'Moustapha Tech',
                    loanProductId: 1,
                    category: 'IT/Technology',
                    tel: '254708453901',
                    town: 'Nairobi',
                    street: 'Moi avenue',
                    poBox: '715-1042 CitySquare',
                    contactFirstName: 'Michael',
                    contactLastName: 'Wanjigi',
                    contactTel: '254708453901',
                    businessPin: 'P0237732726H',
                    loanPurpose: 'Scaling out',
                    operationYrs: 9.0,
                    loanAmount: 2000000.0,
                    currentLiability: 200000.0,
                    currentAsset: 700000.0,
                    inventory: 1100000.0,
                    longTermDebt: 300000.0,
                    shortTermDebt: 70000.0,
                    shareHolderEquity: 600000.0,
                    capital: 1200000.0,
                    netIncome: 400000.0,
                    totalAssets: 2000000.0,
                    totalCashInflows: 700000.0,
                    totalCashOutflows: 200000.0,
                    grossEarning: 1000000.0,
                    capitalShares: 200000.0,
                    businessManagementExperience: 10,
                    boardMeetingEvidenced: true,
                    turnOverInlineWithFinancials: true,
                    excessesInAccountEvidenced: false,
                    crbReport: 1,
                    collateralType: 1,
                    influencedByPolitics: true,
                    loanRepaymentOnSchedule: true,
                    incidenceOfUnpaidCheques: false,
                    ethicalIssuesArisingFromBsActivities: false,
                    environmentalIssuesArisingFromBusiness: false,
                    lawCompliant: true,
                    collateralDocumentPath: null,
                    isCollateralDocumentApproved: true,
                    registrationDocumentPath: 'http://saccotest.ekenya.co.ke:8990/files/download/1928739437486275cbs.PNG',
                    isRegistrationDocumentApproved: true,
                    kraPinDocumentPath: null,
                    isKraPinDocumentApproved: true,
                    createdDate: '2022-09-10 07:10:41',
                    verificationComplete: false,
                    loanStatus: 'C',
                    loanRemarks: null,
                    approved: false
                }];
                // result.data;
            },
            error => {
            },
            complete => {
                this.isLoaded = true;
            }
        );

    }

    private loadData(): any {
        this.isLoaded = false;

        this.processedLoan = false;

        this._httpService.scoresGet('loans/products').subscribe(
            result => {
                console.log(result);
                this.dataSet = [{
                    id: 11,
                    businessName: 'Minko tech',
                    loanProductId: 1,
                    category: 'IT/Technology',
                    tel: '254708453901',
                    town: 'Nairobi',
                    street: 'Moi avenue',
                    poBox: '715-1042 CitySquare',
                    contactFirstName: 'Michael',
                    contactLastName: 'Wanjigi',
                    contactTel: '254708453901',
                    businessPin: 'P0237732726H',
                    loanPurpose: 'Scaling out',
                    operationYrs: 9.0,
                    loanAmount: 2000000.0,
                    currentLiability: 200000.0,
                    currentAsset: 700000.0,
                    inventory: 1100000.0,
                    longTermDebt: 300000.0,
                    shortTermDebt: 70000.0,
                    shareHolderEquity: 600000.0,
                    capital: 1200000.0,
                    netIncome: 400000.0,
                    totalAssets: 2000000.0,
                    totalCashInflows: 700000.0,
                    totalCashOutflows: 200000.0,
                    grossEarning: 1000000.0,
                    capitalShares: 200000.0,
                    businessManagementExperience: 10,
                    boardMeetingEvidenced: true,
                    turnOverInlineWithFinancials: true,
                    excessesInAccountEvidenced: false,
                    crbReport: 1,
                    collateralType: 1,
                    influencedByPolitics: true,
                    loanRepaymentOnSchedule: true,
                    incidenceOfUnpaidCheques: false,
                    ethicalIssuesArisingFromBsActivities: false,
                    environmentalIssuesArisingFromBusiness: false,
                    lawCompliant: true,
                    collateralDocumentPath: null,
                    isCollateralDocumentApproved: true,
                    registrationDocumentPath: 'http://saccotest.ekenya.co.ke:8990/files/download/1928739437486275cbs.PNG',
                    isRegistrationDocumentApproved: true,
                    kraPinDocumentPath: null,
                    isKraPinDocumentApproved: true,
                    createdDate: '2022-09-10 07:10:41',
                    verificationComplete: false,
                    loanStatus: 'C',
                    loanRemarks: null,
                    approved: false
                }];
                // result.data;
            },
            error => {
            },
            complete => {
                this.isLoaded = true;
            }
        );
    }

    private viewRecord(data: any) {
        console.log(data);
        this.router.navigate(['loans', 'business', data.id]);
    }
}
