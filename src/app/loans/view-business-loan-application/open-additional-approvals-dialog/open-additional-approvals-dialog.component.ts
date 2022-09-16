import {HttpService} from './../../../shared/services/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-open-doc-dialog',
    templateUrl: './open-additional-approvals-dialog.component.html',
    styleUrls: ['./open-additional-approvals-dialog.component.scss']
})
export class OpenAdditionalApprovalsDialogForBusinessComponent implements OnInit {
    @Input() docData: any;
    @Input() userData: any;

    form: FormGroup;

    username: any;
    public activeModal: any;
    errorMessages: any;
    loading: any;

    constructor(
        private formBuilder: FormBuilder,
        activeModal: NgbActiveModal,
        private httpService: HttpService,
        public toastrService: ToastrService
    ) {
        this.activeModal = activeModal;
    }

    ngOnInit() {
        this.username = this.httpService.Username();

        this.form = this.formBuilder.group({
            loanId: [5],
            boardMeetingEvidenced: [true],
            turnOverInlineWithFinancials: [true],
            excessesInAccountEvidenced: [true],
            crbReport: [0],

            collateralType: [0],
            influencedByPolitics: [true],
            ethicalIssuesArisingFromBsActivities: [true],
            lawCompliant: [true],
            isCollateralDocumentApproved: [true],
            isRegistrationDocumentApproved: [true],
            isKraPinDocumentApproved: [true],
            loanRepaymentOnSchedule: [true],
            incidenceOfUnpaidCheques: [true],
            environmentalIssuesArisingFromBusiness: [true],
        });
    }

    close() {
        this.activeModal.close();
    }

    submitAdminParams() {
        console.log('this.form.value');
        console.log(this.form.value);

        this.httpService.scoresPost('loans/approve', this.form.value).subscribe(
            result => {
                if (result.status === 200) {
                    this.toastrService.success('Record created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create!', 'Failed!');
                }
            });
    }
}
