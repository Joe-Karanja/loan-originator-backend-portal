import {DatePipe} from '@angular/common';
import {HttpService} from 'src/app/shared/services/http.service';
import {Component, ElementRef, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AddValuerUserComponent} from '../add-valuer-user/add-valuer-user.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
    selector: 'app-list-valuers',
    templateUrl: './list-valuers.component.html',
    styleUrls: ['./list-valuers.component.scss'],
    providers: [DatePipe]
})
export class ListValuersComponent implements OnInit {


    // File Upload Functionallity
    fileName = '';

    // File Upload Functionallity






    public isLoaded = false;
    public formData;
    public modalRef: NgbModalRef;
    public settings = {
        selectMode: 'single',  // single|multi
        hideHeader: false,
        hideSubHeader: false,
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [
                {name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;&nbsp;'},
                // { name: 'editrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
            ],
            position: 'right'
        },
        delete: {
            deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
            confirmDelete: true
        },
        noDataMessage: 'No data found',
        columns: {
            // created_on: {
            //   title: 'Applied on',
            //   type: 'string',
            //   valuePrepareFunction: (date) => {
            //     const raw = new Date(date);
            //     const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
            //     return formatted;
            //   },
            // },
            product_id: {
                title: '#',
                type: 'text',
                filter: false,
                valuePrepareFunction: (value, row, cell) => {
                    return cell.row.index + 1;
                }
            },
            first_name: {
                title: 'Employee Names',
                type: 'string',
                valuePrepareFunction: (value, row, cell) => {
                   return `${row.first_name} ${row.middle_name} ${row.last_name}`;
                }
            },
            // last_name: {
            //     title: 'Last Name',
            //     type: 'string'
            // },
            email_address: {
                title: 'Email',
                type: 'string'
            },
            // amount: {
            //   title: 'Amount',
            //   type: 'string'
            // },
            mobile_number: {
                title: 'Tel',
                type: 'string'
            },
            national_id: {
                title: 'National ID',
                type: 'string'
            },
            monthly_income: {
                title: 'Monthly Income',
                type: 'string'
            },
            //
            // loan_limit: {
            //     title: 'Loan Limit',
            //     type: 'string'
            // },

            // disbursement_status: {
            //   title: 'Disbursed',
            //   type: 'string'
            // },


        },
        pager: {
            display: true,
            perPage: 20
        }
    };
    dataSet: any;
    username: any;
    userType: any;

    private loaderForFileUpload: boolean;
    requiredFileType: any;


    constructor(private _httpService: HttpService,
                private modalService: NgbModal,
                public datePipe: DatePipe,
                public toastrService: ToastrService,
                public router: Router,
                public http: HttpClient,
                private inputEl: ElementRef) {
    }

    ngOnInit() {
        this.loadData();
        this.userType = JSON.parse(localStorage.getItem('user_details'));
        console.log(this.userType);

    }

    public openModal(parentData: any) {
        this.modalRef = this.modalService.open(AddValuerUserComponent);
        this.modalRef.componentInstance.title = 'Add new Employee';
        this.modalRef.componentInstance.parentData = '';
        this.modalRef.result.then((result) => {
            if (result === 'success') {
                this.loadData();
            }
        }, (reason) => {
        });
    }

    uploadEmployees() {

    }

    public editRecord(formData: any) {
        // this.modalRef = this.modalService.open(CreateAssessmentComponent);
        this.modalRef.componentInstance.formData = formData;
        this.modalRef.componentInstance.title = 'Edit User';
        this.modalRef.result.then((result) => {
            if (result === 'success') {
                this.loadData();
            }
        }, (reason) => {
        });
    }

    public onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this._httpService.delete('profile/' + event.data.id).subscribe(
                result => {
                    if (result.response_code === 200) {
                        event.confirm.resolve();
                        this.toastrService.success(event.data.id, 'Deleted!');
                    } else {
                        this.toastrService.error(event.data.id, 'Failed to Delete!');
                    }
                }
            );
        } else {
            event.confirm.reject();
        }
    }

    onCustomAction(event) {
        switch (event.action) {
            case 'viewrecord':
                this.viewCompany(event.data);
                break;
            case 'editrecord':
                this.editRecord(event.data);
        }
    }

    public upload() {
        const inputEl: HTMLInputElement = this.inputEl.nativeElement;

        const fileCount: number = inputEl.files.length;
        const formData = new FormData();
        const headerItems = new Headers();
        headerItems.set('Accept', 'application/json');
        headerItems.delete('Content-Type'); // mandate for accepting binary content
        if (fileCount > 0) {
            for (let i = 0; i < fileCount; i++) {
                formData.append('file', inputEl.files.item(i));
            }
            try {
                this.loaderForFileUpload = true;
                // @ts-ignore
                this.http.post('http://saccotest.ekenya.co.ke:8990/api/v1/employer/upload/bulk/1', formData, {headers: new HttpHeaders(headerItems)})
                    .subscribe((response: any) => {
                        if (response.status === 200) {
                            // this.toastr.success('File uploaded successfully', 'Success!');
                            this.toastrService.success('File uploaded successfully!', 'Created Successfully!');
                        }
                    }, error => {
                        // this._toastr.error('File contents mismatch', error.statusText);
                        this.toastrService.error('File contents mismatch', 'Error');
                    });
            } catch (e) {
                console.log('Error occurred while posting uploaded file. See below message for details : \n');
                console.log(e);
            }
        }
    }

    private loadData(): any {
        this._httpService.model.entity = 'db_customer';
        this._httpService.model.where_clause = '';
        this._httpService.model.where_value = '';
        this._httpService.model.transaction_type = '10071';

        this._httpService.post('', this._httpService.model).subscribe(
            result => {

                console.log('result.list');
                console.log(result.list);
                this.dataSet = result.list;
            },
            error => {
            },
            complete => {
                this.isLoaded = true;
            }
        );
    }

    private viewCompany(data: any): void {
        console.log('employeee data');
        console.log(data);
        this.router.navigate(['employees', data.id], {skipLocationChange: true});
    }

    onFileSelected(event) {

        const file: File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append('file', file);

            // tslint:disable-next-line:max-line-length
            const upload$ = this.http.post('http://saccotest.ekenya.co.ke:8990/api/v1/employer/upload/bulk', formData, { headers: this.getFormHeaders() });

            upload$.subscribe();
            this.loadData();
        }
    }

    private getFormHeaders(): any {
        // return new HttpHeaders({
        //     'Content-Type': '',
        // });
    }

}
