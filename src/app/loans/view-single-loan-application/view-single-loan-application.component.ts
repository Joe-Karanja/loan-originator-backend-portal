import {OpenDocDialogComponent} from './open-doc-dialog/open-doc-dialog.component';
import {HttpService} from 'src/app/shared/services/http.service';
import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {OpenAdditionalApprovalsDialogComponent} from './open-additional-approvals-dialog/open-additional-approvals-dialog.component';


@Component({
    selector: 'app-view-single-loan-application',
    templateUrl: './view-single-loan-application.component.html',
    styleUrls: ['./view-single-loan-application.component.scss']
})
export class ViewSingleLoanApplicationComponent implements OnInit {
    public isLoaded: boolean = false;
    public application: any = true;
    public application_id: any;
    public verified = false;
    public submitted = false;
    public rejected = false;
    public appoved = false;
    public username: any;
    dialogRef: NgbModalRef;
    get_uname: any;
    public loggedInAs: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _httpService: HttpService,
        public fb: FormBuilder,
        private modalService: NgbModal,
        public toastrService: ToastrService,
        public router: Router) {
    }

    ngOnInit() {
        this.username = JSON.parse(localStorage.getItem('user_details'));
        // console.log(this.username);

        this._activatedRoute.params.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                this.application_id = params['id'];
            }
            console.log(this.application_id);

            // this.form = this.fb.group({
            //   premium_amount: ['', [Validators.required]]
            // });
        });
        this.loadApplication();
        this.loggedInAs = localStorage.getItem('logged_in_as');
    }

    public markAs(action: string): void {
        //this.get_uname = JSON.parse(localStorage.getItem('user_details')).company_details.email;
        const model = {
            'username': this.username.username,
            'loan_id': Number(this.application_id),
            'status_desc': action,
            'transaction_type': '100402'
        };
        this._httpService.post('', model).subscribe(
            result => {
                console.log(result);
                if (result.response.response_code === '00') {

                    this.toastrService.success(action, 'Success!');
                } else if (result.response.response_code === '99') {
                    this.toastrService.error(action, 'Error occurred!, try again...');
                } else if (result.response.response_code === '57') {
                    this.toastrService.warning('You have no permission', 'Permission Error');
                }
            },
            error => {
            },
            complete => {
                this.loadApplication();
            }
        );
    }

    openDocument(doc: any) {
        this.dialogRef = this.modalService.open(OpenDocDialogComponent);
        this.dialogRef.componentInstance.docData = doc;
        this.dialogRef.componentInstance.userData = this.username;

    }

    openAdminApprovalsDialog(doc: any) {
        this.dialogRef = this.modalService.open(OpenAdditionalApprovalsDialogComponent, {
            size: 'lg',
        });
        this.dialogRef.componentInstance.docData = doc;
        this.dialogRef.componentInstance.userData = this.username;

    }

    private loadApplication(): void {
        this.isLoaded = false;

        this._activatedRoute.params.subscribe(params => {
            if (typeof params.id !== 'undefined') {
                this.application_id = params.id;
            }
            console.log('this.application_id');
            console.log(this.application_id);


            this._httpService.scoresGet(`loan/loans/history?customerId=${this.application_id}`).subscribe(
                result => {
                    console.log('result');
                    console.log(result);

                    this.application = result.data.content;
                    console.log('here are the application details: this.application');
                    console.log(this.application);
                }
            );

        });


    }
}
