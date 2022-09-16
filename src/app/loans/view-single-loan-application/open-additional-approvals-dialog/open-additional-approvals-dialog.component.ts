import {HttpService} from './../../../shared/services/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-open-doc-dialog',
    templateUrl: './open-additional-approvals-dialog.component.html',
    styleUrls: ['./open-additional-approvals-dialog.component.scss']
})
export class OpenAdditionalApprovalsDialogComponent implements OnInit {
    @Input() docData: any;
    @Input() userData: any;

    form: FormGroup;

    username: any;
    public activeModal: any;
    loading: any;
    errorMessages: any;

    constructor(
        private formBuilder: FormBuilder,
        activeModal: NgbActiveModal,
        private httpService: HttpService,
    ) {
        this.activeModal = activeModal;
    }

    ngOnInit() {
        this.username = this.httpService.Username();

        this.form = this.formBuilder.group({
            id: ['', [Validators.required]],
            securityType: ['', [Validators.required]],
            boardMeetingEvidenced: ['', [Validators.required]],
            turnOverInlineWithFinancials: ['', [Validators.required]],
            excessesInAccountEvidenced: ['', [Validators.required]],
            crbReport: ['', [Validators.required]],
            collateralType: ['', [Validators.required]],
            influencedByPolitics: ['', [Validators.required]],
            ethicalIssuesArisingFromBsActivities: ['', [Validators.required]],
            lawCompliant: ['', [Validators.required]],
            isCollateralDocumentApproved: ['', [Validators.required]],
            isRegistrationDocumentApproved: ['', [Validators.required]],
            isKraPinDocumentApproved: ['', [Validators.required]],
        });
    }

    close() {
        this.activeModal.close();
    }

    submitData() {

    }
}
