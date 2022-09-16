import {HttpService} from './../../../shared/services/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-open-doc-dialog',
    templateUrl: './open-confirm-payment-dialog.component.html',
    styleUrls: ['./open-confirm-payment-dialog.component.scss']
})
export class OpenConfirmPaymentDialogComponent implements OnInit {

    @Input() userData: any;

    form: FormGroup;

    username: any;

    public errorMessages;
    public activeModal: any;

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
            recommendation: ['', [Validators.required]],
            paymentMode: ['', [Validators.required]],
            transactionNumber: ['', [Validators.required]],
        });
    }

    close() {
        this.activeModal.close();
    }

    submitData() {
        console.log('submitted values');
    }
}
