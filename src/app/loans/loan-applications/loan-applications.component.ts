import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {PdfReportsService} from './pdf.service';
import {DateFilterComponent} from '../services/DateFilterComponent';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-loan-applications',
    templateUrl: './loan-applications.component.html',
    styleUrls: ['./loan-applications.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class LoanApplicationsComponent implements OnInit {
    public status = 'submitted';
    public formData;
    public modalRef: NgbModalRef;
    public settings;
    dataSet: any;

    public isLoaded = false;

    public products: any;
    public categories: any;
    public subcategories: any;
    public tempData: any = [
        {
            'id': 1,
            'customerId': 1,
            'customerName': 'John Javier',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 70,
            'totalDisbursed': 0,
            'loanAmount': 6000,
            'status': true,
            'appliedOn': '2022-02-16 03:17:06'
        },
        {
            'id': 2,
            'customerId': 3,
            'customerName': 'Daniel Mwangi',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 100,
            'totalDisbursed': 0,
            'loanAmount': 8000,
            'status': true,
            'appliedOn': '2022-02-16 03:21:25'
        },
        {
            'id': 3,
            'customerId': 2,
            'customerName': 'David Dsalaash',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 1000,
            'totalDisbursed': 0,
            'loanAmount': 5000,
            'status': true,
            'appliedOn': '2022-02-24 09:16:20'
        },
        {
            'id': 4,
            'customerId': 6,
            'customerName': 'Morris Kiboori',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 400,
            'totalDisbursed': 0,
            'loanAmount': 2000,
            'status': true,
            'appliedOn': '2022-02-24 09:20:56'
        },
        {
            'id': 5,
            'customerId': 6,
            'customerName': 'Morris Kiboori',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 400,
            'totalDisbursed': 0,
            'loanAmount': 2000,
            'status': true,
            'appliedOn': '2022-02-24 09:20:56'
        },
        {
            'id': 6,
            'customerId': 11,
            'customerName': 'Salim Mwenesi',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 600,
            'totalDisbursed': 0,
            'loanAmount': 3000,
            'status': true,
            'appliedOn': '2022-02-24 09:38:26'
        },
        {
            'id': 7,
            'customerId': 11,
            'customerName': 'Salim Mwenesi',
            'organizationId': 1,
            'cycleId': 1,
            'processingFee': 600,
            'totalDisbursed': 0,
            'loanAmount': 30000000,
            'status': false,
            'appliedOn': '2022-02-24 09:38:26'
        }
    ];

    org: any;
    public loggedInAs: string;

    constructor(config: NgbModalConfig,
                private _httpService: HttpService,
                private modalService: NgbModal,
                private router: Router,
                private pdfService: PdfReportsService,
                public datePipe: DatePipe,
                public currencyPipe: CurrencyPipe,
                public toastrService: ToastrService) {
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
                customerId: {
                    title: '#',
                    type: 'string',
                    filter: false
                },
                customerName: {
                    title: 'Employee Name',
                    type: 'string'

                },

                processingFee: {
                    title: 'Processing Fee',
                    type: 'string',
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes.');
                        return formatted;
                    },
                },

                totalDisbursed: {
                    title: 'Total Disbursed',
                    type: 'string',
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes.');
                        return formatted;
                    },
                },
                loanAmount: {
                    title: 'Loan Amount',
                    type: 'string',
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes.');
                        return formatted;
                    },
                },

                status: {
                    title: 'Loan Status',
                    type: 'html',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        let formatted;
                        if (value) {
                            formatted = '<span class="badge badge-success" style="text-align: center;">Success</span>';
                        } else {
                            formatted = '<span class="badge badge-danger" style="text-align: center;">Failed</span>';
                        }
                        return formatted;
                    },
                },
                // loan_balance: {
                //   title: 'Loan Balance',
                //   type: 'string',
                //   valuePrepareFunction: (value) => {
                //     const formatted = this.currencyPipe.transform(value, 'Kes.');
                //     return formatted;
                //   },
                // },
                appliedOn: {
                    title: 'Date',
                    filter: false,
                    valuePrepareFunction: (created) => {
                        return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
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

    exportReport(statement: string) {

        const width = [80, 80, 80, 80, 80, 80];
        const headers = [
            {
                text: '#.',
                style: 'tableHeader'
            },
            {
                text: 'Employee Name',
                style: 'tableHeader'
            },

            {
                text: 'Processing Fee',
                style: 'tableHeader'
            },
            {
                text: 'Total Disbursed',
                style: 'tableHeader'
            },
            {
                text: 'Loan Amount',
                style: 'tableHeader'
            },
            {
                text: 'Date Applied',
                style: 'tableHeader'
            }
        ];
        const dataArray = this.dataSet.map(st => {

            console.log(st);
            return [
                st.customerId,
                st.customerName,
                st.processingFee,
                st.totalDisbursed,
                st.loanAmount,
                st.appliedOn,

            ];
        });
        const allDetails = {
            widths: undefined,
            header: undefined,
            dataArray: undefined
        };
        allDetails.widths = width;
        allDetails.header = headers;
        allDetails.dataArray = dataArray;
        const document_name = statement + moment().format('MMMM Do YYYY, h:mm') + '.pdf';
        const documentDefinition = this.pdfService.getDocumentDefinition(allDetails, 'Salary Advance Loans'); // { content: this.list.first_name + " " + this.list.last_name };
        pdfMake.createPdf(documentDefinition).download(document_name);
    }

    private loadData(): any {
        this.isLoaded = false;
        // const model = {
        //     // "username": "",
        //     entity: 'loans',
        //     where_clause: this.org.company_details ? 'organization_id' : '',
        //     where_value: this.org.company_details ? String(this.org.company_details.org_id) : '',
        //     transaction_type: '10071',
        //     // "order_by": "desc"
        // };
        // console.log(model);

        this._httpService.scoresGet(`loan/?size=15&page=0&orgId=1`).subscribe(
            result => {
                console.log(result);
                this.dataSet =
                    // result.data;
                    this.tempData;
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
        this.router.navigate(['/loans', data.id]);
    }

}
