import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CreateAssessmentComponent} from '../create-assessment/create-assessment.component';


@Component({
    selector: 'app-loan-applications',
    templateUrl: './business-loan-assessment.component.html',
    styleUrls: ['./business-loan-assessment.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class BusinessLoanAssessmentComponent implements OnInit {
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
    private mappedAnalysis: Promise<any>;

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
                    {name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;'},
                    {name: 'editRecord', title: '&nbsp; <i class="fa fa-pencil text-secondary fa-lg"></i> &nbsp; &nbsp;'},
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
                // productCode: {
                //     title: 'Product Code',
                //     type: 'string',
                //     filter: false
                // },
                // penaltyMode: {
                //     title: 'Penalty Mode',
                //     type: 'string',
                //     filter: false
                //
                // },
                type: {
                    title: 'Loan Type',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        console.log('this.dataset');
                        console.log(this.dataSet);
                        return 'Business';
                    },
                },
                score: {
                    title: 'Score',
                    type: 'number',
                    filter: false,
                    valuePrepareFunction: (score) => {
                        if (this.processedLoan) {
                            console.log('score Value');
                            console.log(score);
                            return score;
                        } else {
                            return '---';
                        }
                    },
                },
                combined: {
                    title: 'Pricing',
                    type: 'html',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        if (this.processedLoan) {
                            if (value.marginRate <= 0 && value.class === 'A') {
                                return `CB Base rate (x%)`;
                            } else if (value.marginRate <= 0 && value.class !== 'A') {
                                return `Not within acceptable threshold`;
                            } else if (value.marginRate <= 1) {
                                return `CB Base rate + margin of ${value.marginRate}%`;
                            } else if (value.marginRate <= 2) {
                                return `CB Base rate + margin of ${value.marginRate}%`;
                            } else if (value.marginRate <= 4) {
                                return `CB Base rate + margin of ${value.marginRate}%`;
                            }
                        } else {
                            return '---';
                        }
                    },
                },

                class: {
                    title: 'Class',
                    type: 'html',
                    filter: false,
                    valuePrepareFunction: (value) => {
                        if (this.processedLoan) {
                            if (value === 'A') {
                                return `<span class="badge badge-success text-center">A Rating</span>`;
                            } else if (value === 'B') {
                                return `<span class="badge badge-primary text-center">B Rating</span>`;
                            } else if (value === 'C') {
                                return `<span class="badge badge-secondary text-center">C Rating</span>`;
                            } else if (value === 'D') {
                                return `<span class="badge badge-warning text-center">D Rating</span>`;
                            } else if (value === 'E') {
                                return `<span class="badge badge-danger text-center">E Rating</span>`;
                            }
                        } else {
                            return '---';
                        }
                    },
                },
                createdDate: {
                    title: 'Application Date',
                    type: 'string',
                    filter: false,
                    valuePrepareFunction: (date) => {

                        console.log('date received from backend');
                        console.log(date);
                        const raw = new Date(date);
                        const formatted = raw.toLocaleString();

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
                this.openAssessmentModal(event.data);
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


    openAssessmentModal(data) {

        console.log('calling this');
        console.log(data);

        this.modalRef = this.modalService.open(CreateAssessmentComponent, {size: 'lg'});
        this.modalRef.componentInstance.title = 'New Assessment';
        this.modalRef.componentInstance.parentData = data;
        this.modalRef.componentInstance.formData = data;
        this.modalRef.result.then((result) => {
            if (result === 'success') {
                this.loadData();
            }
        }, (reason) => {
        });
    }

    private loadData(): any {
        this.isLoaded = false;

        this.processedLoan = false;

        this._httpService.scoresGet('loans/pending').subscribe(
            result => {
                console.log('Get analysis products');
                console.log(result);
                this.dataSet = result.data;
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

    getProcessedApplications() {
        this.isLoaded = false;
        this._httpService.scoresGet('loans/analyzed').subscribe(
            result => {

                const cleanResult = result.data;

                Promise.all(cleanResult.map(async item => {

                    const content = await this._httpService.scoresGet(`loans/loanAnalysis/v2/${item.id}`).toPromise();

                    const ans = content.data;

                    item.score = ans.score;
                    item.marginRate = ans.marginRate;
                    item.baseRate = ans.baseRate;
                    item.combined = {
                        marginRate: ans.marginRate,
                        class: ans.pricing.rating
                    };

                    item.class = ans.pricing.rating;

                    return item;
                    })

                ).then(r  => {
                    console.log('r');
                    console.log(r);
                    this.dataSet = r;
                    this.processedLoan = true;
                    this.isLoaded = true;
                });
            });
    }

}
