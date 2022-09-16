import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {PdfReportsService} from './pdf.service';
import {TenantAddComponent} from '../../../../tenants/manage-tenants/tenant-add/tenant-add.component';
import {CloseCycleComponent} from '../close-cycle/close-cycle.component';
import {CreateAssessmentComponent} from '../../../create-assessment/create-assessment.component';
import {CreateCycleComponent} from '../create-cycle/create-cycle.component';
import {ViewCell} from 'ng2-smart-table';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-loan-applications',
    templateUrl: './list-loan-cycles.component.html',
    styleUrls: ['./list-loan-cycles.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class ListLoanCyclesComponent implements OnInit {

    public tempData = [{
        id: 1,
        customerId: 1,
        cycleName: 'Mar 1st-15th',
        startDate: '2022-03-01T15:17:06.231',
        endDate: '2022-03-01T15:17:06.231',
        totalDisbursed: 6000.0,
        processingFee: 70.0,
        status: true,
        totalLoans: 3
    },
        {
            id: 2,
            customerId: 2,
            cycleName: 'Mar 16th-27th',
            startDate: '2022-03-16T15:17:06.231',
            endDate: '2022-03-27T15:17:06.231',
            totalDisbursed: 6000.0,
            processingFee: 70.0,
            status: true,
            totalLoans: 4
        },
        {
            id: 3,
            customerId: 3,
            cycleName: 'Jul 1st-15th',
            startDate: '2022-07-01T15:17:06.231',
            endDate: '2022-07-15T15:17:06.231',
            totalDisbursed: 6000.0,
            processingFee: 70.0,
            status: true,
            totalLoans: 6
        }];


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

    selectedPeriod: string = "days";
    selectedGroup: string = "";
    selectedType: string = "";
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
                columnTitle: '',
                add: false,
                edit: false,
                delete: false,
                custom: [
                    {name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;&nbsp;'},
                    {name: 'editRecord', title: '<span class="text-danger ml-4"><i class="fa fa-times text-center mr-2"></i>Close Cycle</span>'}
                    ],
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
                cycleName: {
                    title: 'Period',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        return value.month + ' ' + value.startDate + '-' + value.endDate;
                    }
                },

                startDate: {
                    title: 'Start Date',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        return value.startDate + ' ' + value.month + '-' + 2022;
                    },
                },

                endDate: {
                    title: 'End Date',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        return value.endDate + ' ' + value.month + '-' + 2022;
                    },
                },

                loansCount: {
                    title: 'No. of Loans',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {

                        return value + ' loans.' ;
                    },
                },

                loansValue: {
                    title: 'Total Disbursed',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        const formatted = this.currencyPipe.transform(value, 'Kes.');
                        return formatted;
                    },
                },

                // processingFee: {
                //     title: 'Total Processing Fee',
                //     type: 'string',
                //     filter: false,
                //     valuePrepareFunction: (value) => {
                //         const formatted = this.currencyPipe.transform(value, 'Kes.');
                //         return formatted;
                //     },
                // },

                // loan_balance: {
                //   title: 'Loan Balance',
                //   type: 'string',
                //   valuePrepareFunction: (value) => {
                //     const formatted = this.currencyPipe.transform(value, 'Kes.');
                //     return formatted;
                //   },
                // },

                // button: {
                //     title: '',
                //     type: 'custom',
                //     filter: false,
                //     renderComponent: CloseCycleButtonComponent,
                //     onComponentInitFunction(instance) {
                //         console.log('here is the instance');
                //         console.log(instance);
                //         instance.save.subscribe(row => {
                //             alert(`${row.name} closed!`);
                //         });
                //     }
                // },

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
        this.modalRef = this.modalService.open(CloseCycleComponent);
        this.modalRef.componentInstance.title = 'Close Cycle ';

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
                text: 'Full Name',
                style: 'tableHeader'
            },

            {
                text: 'Date Applied',
                style: 'tableHeader'
            },

            {
                text: 'Loan Amount',
                style: 'tableHeader'
            },

            {
                text: 'Total Disbursed',
                style: 'tableHeader'
            },

            {
                text: 'Processing Fee',
                style: 'tableHeader'
            },


        ];
        const dataArray = this.dataSet.map(st => {

            console.log(st);
            return [
                st.customerId,
                st.customerName,
                this.datePipe.transform(new Date(st.appliedOn), 'MM/dd/yyyy'),
                'Kes.' + st.loanAmount,
                'Kes.' + st.totalDisbursed,
                'Kes.' + st.processingFee,

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
        const documentDefinition = this.pdfService.getDocumentDefinition(allDetails, 'Salary Advance Summary'); // { content: this.list.first_name + " " + this.list.last_name };
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

        this._httpService.scoresGet(`loan/cycle/history?orgId=1&size=50&page=0`).subscribe(
            result => {
                console.log(result);

                this.dataSet = result.data.map((item: any) => {
                    item.cycleName = {month: item.cycleMonth, startDate: item.cycleStart, endDate: item.cycleEnd};
                    item.startDate = {month: item.cycleMonth, startDate: item.cycleStart, endDate: item.cycleEnd};
                    item.endDate = {month: item.cycleMonth, startDate: item.cycleStart, endDate: item.cycleEnd};
                    item.totalDisbursed = item.totalAmount;
                    item.loansCount = item.loansCount;
                    return item;
                });
                // this.dataSet =
                //     result.data;
                //     // this.tempData;
            },
            error => {
            },
            complete => {
                this.isLoaded = true;
            }
        );
    }

    private viewRecord(data: any) {
        console.log('cycleData');
        console.log(data);
        this.router.navigate(['/loans/cycles/', data.cycleId]);
    }


    getDate($event: any) {

    }

    openCycleModal(data) {

        this.modalRef = this.modalService.open(CreateCycleComponent);
        this.modalRef.componentInstance.title = 'New Cycle';
        this.modalRef.componentInstance.parentData = data;
        this.modalRef.componentInstance.formData = data;
        this.modalRef.result.then((result) => {
            if (result === 'success') {
                this.loadData();
            }
        }, (reason) => {
        });
    }
}
