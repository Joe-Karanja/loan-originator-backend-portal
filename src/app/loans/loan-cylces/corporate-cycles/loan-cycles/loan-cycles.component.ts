import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

import * as _ from 'lodash';

import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {PdfReportsService} from './pdf.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-loan-applications',
    templateUrl: './loan-cycles.component.html',
    styleUrls: ['./loan-cycles.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class LoanCyclesComponent implements OnInit {

    public totalLoans;
    public totalAmount;

    public tempData = [
        {
            id: 1,
            txnRefNo: 'TX6884773634',
            date: '2022-06-16T15:08:24.231',
            time: '2022-06-16T15:08:24.231',
            staffName: 'John Javier',
            staffNumber: 'E01-030',
            disbursedTo: 'MPESA',
            accountNumber: '0728699128',
            amountDisbursed: 6000.0,
        },
        {
            id: 2,
            txnRefNo: 'TX4699483837',
            date: '2022-06-16T15:09:30.231',
            time: '2022-06-16T08:09:30.231',
            staffName: 'Marx Mutuma',
            staffNumber: 'E01-035',
            disbursedTo: 'ACCOUNT',
            accountNumber: '0160164575581556',
            amountDisbursed: 7000.0,

        },
        {
            id: 3,
            txnRefNo: 'TX2239483831',
            date: '2022-06-16T05:11:47.241',
            time: '2022-06-16T05:11:47.241',
            staffName: 'David Salaash',
            staffNumber: 'E01-038',
            disbursedTo: 'MPESA',
            accountNumber: '0708453901',
            amountDisbursed: 8000.0,

        }
    ];


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

    selectedPeriod: string = 'days';
    selectedGroup: string = '';
    selectedType: string = '';
    groups: any[];
    queryDate: any;

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
                    filter: false,
                    valuePrepareFunction: (value, row, cell) => {
                        return cell.row.index + 1;
                    }
                },

                staffNumber: {
                    title: 'Staff Number',
                    type: 'string',
                    filter: false,
                },
                staffName: {
                    title: 'Staff Name',
                    type: 'string',
                    filter: false,
                },
                amountDisbursed: {
                    title: 'Amount Disbursed',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes.');
                        return formatted;
                    },
                },
                disbursedTo: {
                    title: 'Disbursed To',
                    type: 'string',
                    filter: false,
                },
                accountNumber: {
                    title: 'Account Number',
                    type: 'string',
                    filter: false,
                },
                txnRefNo: {
                    title: 'Txn Ref No.',
                    type: 'string',
                    filter: false,
                },
                date: {
                    title: 'Disbursed At',
                    filter: false,
                    valuePrepareFunction: (created) => {
                        return this.datePipe.transform(new Date(created), 'MMM d, y, h:mm:ss a');
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

        const width = [10, 50, 60, 60, 80, 80, 60, 60 ];
        const headers = [
            {
                text: '#.',
                style: 'tableHeader'
            },
            {
                text: 'Txn Ref No.',
                style: 'tableHeader'
            },

            {
                text: 'Staff No.',
                style: 'tableHeader'
            },

            {
                text: 'Staff Name',
                style: 'tableHeader'
            },

            {
                text: 'Disbursed To',
                style: 'tableHeader'
            },

            {
                text: 'Account No.',
                style: 'tableHeader'
            },

            {
                text: 'Amount',
                style: 'tableHeader'
            },

            {
                text: 'Date',
                style: 'tableHeader'
            },


        ];
        const dataArray = this.dataSet.map(st => {

            console.log(st);
            return [
                st.id,
                st.txnRefNo,
                st.staffNumber,
                st.staffName,
                st.disbursedTo,
                st.accountNumber,
                'Kes.' + st.amountDisbursed,
                this.datePipe.transform(new Date(st.date), 'MM/dd/yyyy'),
            ];
        });
        const allDetails = {
            widths: undefined,
            header: undefined,
            dataArray: undefined,
            summaryDetails: undefined
        };
        allDetails.widths = width;
        allDetails.header = headers;
        allDetails.dataArray = dataArray;


        allDetails.summaryDetails = {
            totalAmount: this.totalAmount,
            totalLoans: this.totalLoans
        };
        const document_name = statement + moment().format('MMMM Do YYYY, h:mm') + '.pdf';
        const documentDefinition = this.pdfService.getDocumentDefinition(allDetails, 'Salary Advance Summary'); // { content: this.list.first_name + " " + this.list.last_name };
        pdfMake.createPdf(documentDefinition).download(document_name);
    }

    getDate($event: any) {

    }

    private loadData(): any {
        this.isLoaded = false;

        this._httpService.scoresGet(`loan/cycle/report?cycleId=1&orgId=1`).subscribe(
            result => {
                console.log(result);
                this.totalAmount = result.data.loansValue;
                this.totalLoans = result.data.loansCount;

                this.dataSet =
                    result.data.loanApplications.map(item => {
                        const newModel =  {
                            id: item.id,
                            txnRefNo: `TX22394838${item.customerId}`,
                            date: item.appliedOn,
                            time: item.appliedOn,
                            staffName: item.customerName,
                            staffNumber: `E01-${item.customerId}`,
                            disbursedTo: _.sample(['Airtel', 'MTN', 'Vodafone']),
                            accountNumber: `07${item.customerId}8453901`,
                            amountDisbursed: item.loanAmount,
                        }
                        return newModel;
                    });
                    // this.tempData;
            },
            error => {
            },
            complete => {
                this.isLoaded = true;
            }
        );
    }

    private viewRecord(data: any) {
        this.router.navigate(['/loans', data.id]);
    }
}
